(*
	This annotation assistant will produce a single annotation file each time it is run.  The use case is to choose text in a PDF, optionally add a highlight to it (the highlight does not affect the operation of the script), and then run the script.  When the script is run it will:

	1. Check to see if a document and text (the citation) in that document are selected; otherwise terminate
	2. Ask for a "prefix" -- this is a shorthand identifier for the annotation file
	3. Ask for a "note" -- any text that describes the text (for example)
	4. Ask for tags -- a semicolon-separated list of tags that will be added to the document (can be exported as Mavericks tags) and also are listed inside the annotation document
	5. Ask for a file name for the annotation document -- the default is Prefix + name of the original document.  This can be changed in the dialog.
	6. Create a file that contains all of the above, as well as links to search for the citation, for that page of the PDF, and to open that document in the location in the database package where it is stored.  The latter link is powerful and dangerous -- do not add or remove things directly from the annotation package.

	v2

	a. Create RTF output
*)

property noDecoration : "\" style=\"text-decoration:none;"
property quoteColor: "style=\"color: #FFD479;\""
property mainFont: "Interface-Regular"
property fontSize: "26"
property noteTag: "note"

on run_highlight()
  tell application "System Events"
      -- my custom keystroke to highlight text Orange.
      keystroke "o" using {command down, option down}
  end tell
end run_highlight

on replace_chars(this_text, search_string, replacement_string)
 set AppleScript's text item delimiters to the search_string
 set the item_list to every text item of this_text
 set AppleScript's text item delimiters to the replacement_string
 set this_text to the item_list as string
 set AppleScript's text item delimiters to ""
 return this_text
end replace_chars

-- adapted from https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/EncodeandDecodeText.html#//apple_ref/doc/uid/TP40016239-CH51-SW5
on encodeCharacter(theCharacter)
  (*
  set theASCIINumber to (the ASCII number theCharacter)
  set theHexList to {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"}
  set theFirstItem to item ((theASCIINumber div 16) + 1) of theHexList
  set theSecondItem to item ((theASCIINumber mod 16) + 1) of theHexList
  return ("%" & theFirstItem & theSecondItem) as string
  *)
  set theChar to ASCII number theCharacter
  if theChar is in {212, 213} then
    return "&lsquo;"
  else if theChar is in {34} then
    return "&quot;"
  else
    return "&#" & (ASCII number theCharacter as string) & ";"

  end if
end encodeCharacter

on html_escape(theText, encodeCommonSpecialCharacters, encodeExtendedSpecialCharacters)
  set theStandardCharacters to "abcdefghijklmnopqrstuvwxyz0123456789 ,"
  --set theCommonSpecialCharacterList to "$+!'/?;&@=#%><{}\"“”~`^\\|*"
  set theCommonSpecialCharacterList to "\""
  set theExtendedSpecialCharacterList to ".-_:"
  set theAcceptableCharacters to theStandardCharacters
  if encodeCommonSpecialCharacters is false then set theAcceptableCharacters to theAcceptableCharacters & theCommonSpecialCharacterList
  if encodeExtendedSpecialCharacters is false then set theAcceptableCharacters to theAcceptableCharacters & theExtendedSpecialCharacterList
  set theEncodedText to ""
  repeat with theCurrentCharacter in theText
    if theCurrentCharacter is in theAcceptableCharacters then
      set theEncodedText to (theEncodedText & theCurrentCharacter)
    else
      set theEncodedText to (theEncodedText & encodeCharacter(theCurrentCharacter)) as string
    end if
  end repeat
  return theEncodedText
end html_escape

on template_note(theDocument, thePageNumber, theQuotedText)
  (* `document`, `pageLink` and `quotedText` are all optional. TODO: explain. *)
  if theDocument is not equal to missing value then
    set theDocName to the first item of theDocument
    set theDocURL to the second item of theDocument
    set theDocPath to the third item of theDocument
  else
    set thePageNumber to missing value
    set theQuotedText to missing value
    set theDocURL to ""
  end if
  if thePageNumber is not equal to missing value then
    set thePageSuffix to "?page=" & (thePageNumber as string)
    set thePageURL to theDocURL & thePageSuffix
    set theDocumentLink to " (<a href=\"file://" & theDocPath & noDecoration & "\">" & " File " & "</a>)"
  end if

  if theQuotedText is not equal to missing value then
    (* Note with page link and quote *)
    (* Make a text-search link for this citation
       TODO: doesn't handle citations with double quote marks well, or punctuation. *)
    if thePageNumber is not equal to missing value then
      set theQuote to "<p><span " & quoteColor & ">" & theQuotedText & "</span>" & "&nbsp; pp. " & ((thePageNumber + 1) as string) & "</p><br>"
      set thePageLink to "<p>(<a href=\"" & thePageURL & noDecoration & "\">" & " Go to source " & "</a>)</p><br>"
    else
      set theQuote to "<p><span " & quoteColor & ">" & theQuotedText & "</span>" & "</p><br>"
      set thePageLink to "<p>(<a href=\"" & theDocURL & noDecoration & "\">" & " Go to source " & "</a>)</p><br>"
    end if
  else if thePageNumber is not equal to missing value then
    (* Note with page link. *)
    set thePageLink to "<p>(<a href=\"" & thePageURL & noDecoration & "\">" & " Go to source " & "</a>)</p><br>"
    set theQuote to ""
  else
    (* Blank note *)
    set thePageLink to ""
    set theQuote to ""
  end if

  set htmlAnn to thePageLink & theQuote

  (* Create RTF from HTML, replacing some stuff. *)
  set theRtf to (do shell script "echo " & quoted form of htmlAnn & " | textutil -format html -convert rtf -stdin -stdout")
  set theRtf to my replace_chars(theRtf, "\\sa240", "") -- no paragraph spacing
  set theRtf to my replace_chars(theRtf, "Times-Roman", mainFont) -- custom font
  set theRtf to my replace_chars(theRtf, "\\fs24", ("\\fs" & fontSize))

  if thePageNumber is not equal to missing value then
    set theAnnotationName to (theDocName & "_pp" & ((thePageNumber + 1) as string) & "_note")
  else if theQuotedText is not equal to missing value then
    set theAnnotationName to (theDocName & "_note")
  else
    -- get name from user if no doc
    set noteName to text returned of (display dialog "New note name" with title "New note name" default answer "thought")
    set theAnnotationName to noteName & "_note"
  end if

  return {URL:theDocURL, name:theAnnotationName, source:theRtf}
end template_note

tell application id "DNtp"
  try
		(* Figure out the state of what's selected: text, page, or no document *)
    set theSelection to (the selection as list)
    if (count of theSelection) is equal to 0 then
      (* Scenario 1: Nothing open. *)
      set theDocument to missing value
      set thePage to missing value
      set theQuotedText to missing value
    else
      set _theDocument to the first item of (the selection as list)
      -- NB: hack to pass theDocument as list due to inscrutable error passing theDocument directly
      set theDocument to {name of _theDocument, reference URL of _theDocument as string, the path of _theDocument}
      if the current page of think window 1 ≠ -1 then
        set thePage to ((the current page of think window 1) as string)
      else
        set thePage to missing value
      end if

      set theCitedText to the (selected text of think window 1 as string)
  		if theCitedText is "" then
        (* Scenario 2: Document is open, but no text is highlighted. *)
        set theQuotedText to missing value
      else
        (* Scenario 3: Document is open, text is highlighted. *)
        set theQuotedText to theCitedText
        if thePage is not equal to missing value then
          my run_highlight() (* should not be run if there is no page, in which case the doc is a URL *)
        end if
      end if
    end if

    (* Create a new RTF with same tags as document *)
    set theAnnotation to my template_note(theDocument, thePage, my html_escape(theQuotedText, false, false))
    set theAnnDoc to create record with (theAnnotation & {type:rtf}) in current group

    if theDocument is equal to missing value then
      set theTags to {noteTag}
    else
      set theTags to ((tags of _theDocument) & {noteTag})
    end if

    set tags of theAnnDoc to theTags
    open window for record theAnnDoc

	on error error_message number error_number
		if the error_number is not -128 then display alert "DEVONthink Pro" message error_message as warning
	end try
end tell
