---
title: "Associative Archiving with DEVONthink: Part III"
url: associative-archiving-with-devonthink-3
date: 2020-12-30
---
Annotations in DT have long been a bit of a brain tangle for me. My spec for annotations (since I didn't go into this in [part I](https://lachlankermode.com/associative-archiving-with-devonthink-1)) is as follows: 

<style> li { display: revert !important; }</style>
<ol style="padding-left:revert;">
<li>There should be no constraints on how many annotations you can take from a document. You could take none, one or two, or ten thousand.</li>
<li>An annotation should have an inlined quote (whatever text is highlighted when you create the annotation), and should have a one-click reference back to the specific page of the source document from which it's drawn (if it is a PDF- for webarchives and weblocs there is no notion of pages, so a generic reference to the document suffices).</li>
<li>Annotations need to be their own entities in the archive. This has several implications. One of these is that an annotation is not solely or specifically bound to its source document. Annotations can be included in projects without necessarily including the source document itself. Another is that annotations can have their own tags which need not be the same as their source document's.</li>
<li>Annotations should be recognizably distinct from other documents. This is perhaps a personal preference, but I think that it makes sense given that an annotation is part source text, part text that I myself have written (an associated note). In this sense annotations are closer to files in my PKB (explained in brief at the top of this post) than any other content in my archive. They are part source material, part my own creation.</li>
<li>Creating annotations should be possible _from anywhere_: not just within DEVONthink.</li>
</ol>

Though it leaves a bit to be desired in my workflow, it does make sense to me why DT does not include support for annotations natively. DT wants to be as general-purpose a file manager as possible, and to not force your hand when it comes to file formats or workflows. The conception of an annotation that I have above is something fairly specific to an academic or otherwise citational workflow, and might not be necessary for many folks' file management philosophies. For many, DT is a starting point: it opens up onto other applications. Having some sort of DT-specific file type for annotations would run against this.

## Annotations as RTFs (my old approach)
Though it doesn't support annotations out of the box, many have tried to create an annotation workflow in DT. See [here](https://discourse.devontechnologies.com/t/best-way-for-annotations/52610/13) and [here](https://discourse.devontechnologies.com/t/make-an-annotation-with-links-notes-tags-v2/17221/21) for some examples. A common way to manufacture annotations is to create a shortcut that creates a new text file from a template, which includes a link back to the source document via DT's [URL schema](https://talk.macpowerusers.com/t/playing-with-devonthink-what-are-your-most-interesting-uses/13708/2) (which allows you to open up specific documents, at specfic page numbers, from anywhere on your Mac).

This works okay, and I used a similar workflow for a long time: `Cmd-Option-;` to automatically create a new RTF with the highlighted text in a different colour, with a hyperlink at the top that can take me back to the quotes source. (If you're interested to try this approach, my script is [available here](https://lachlankermode.com/TakeNote.applescript)) Any other notes I wanted to write about the quote just went directly in the RTF document beneath. This approach satisfies at roughly three and arguably four of the conditions outlined above, with the arguable exception being number four: RTF documents are not particularly distinct from other documents, especially if you happen to have word documents and other rich text as source documents in your archive. You can get part of the way there by using a naming schema for RTF annotations, but it was still a bit messy by my measure. 

<div class="m-15" style="display:flex;justify-content:center;align-items:center;">
    <img src="static/rtf-note-example.png" width="100%">
</div>

Most importantly, creating annotations from outside DEVONthink gets messy very quickly, meaning that this approach falls flat on condition five. In theory, you can write scripts to generate RTFs on other devices, and then you could work out some syncing mechanism to carry those annotations into your main DT workstation at some point via Dropbox or otherwise: but it's not ideal. Moreover, RTF isn't the most straightfoward format to generate. (Although admittedly you could replace RTFs with Markdown or something similar; it just wouldn't look as nice inside DT.)

## Annotations as RSS (my current approach)
A month or so ago, I came across Francis Tseng's [wonderful writeup regarding his research tooling](https://spaceandtim.es/etc/research_tools/). One of the components of his workflow is a super simple HTTP server called [hili](https://github.com/frnsys/hili), which accepts 'clips' at a POST endpoint, and stores them as simple JSON. Clips contain whatever the source quote and images, a reference to the URL where the clip happened, and optional tags that can be used further on to help categorise the clip.

I really liked this idea, as it detaches the idea of taking notes from any application in particular and makes it universally available wherever there's an Internet connection (and the ability to send a simple POST request). I [modified hili](https://github.com/breezykermo/hili) by adding the ability to take a note associated with each clip, and added scripts for [DEVONthink](https://github.com/breezykermo/hili/tree/master/clients/devonthink) and [iOS](https://github.com/breezykermo/hili/tree/master/clients/scriptable-ios) in addition to Francis' original [extension for Firefox](https://github.com/breezykermo/hili/tree/master/clients/firefox).

For a while I clipped away while reading on my various devices, building up a [database of clips](https://research.forensic-architecture.org/hili/view) from both webpages and DT documents. Thanks to DT's URL schema, I can treat DT URLs in the same way that I do HTTP ones: as hyperlinks that can open up the right document in DT from wherever else (i.e. directly from the browser in which the clips are shown. Note that this won't work using my clips, as the DT URLs are local to my computer).  

<div class="m-15" style="display:flex;justify-content:center;align-items:center;">
    <img src="static/hili-with-dt-html.png" width="100%">
</div>

The HTML view of clips pictured above is handy, and is nice to confirm that cilps are coming in, or to quickly search for a clip from wherever: I just have to open up a browser from any device to my hili URL and I have them all. I developed a [basic way to filter clips by tag](https://research.forensic-architecture.org/hili/view?t=infraspace)- but quickly realised that I would have to build a full frontend interface with full text search to really get the most out of my clips.

Even then, the clips in hili would sit separately from everything else in DT, which is less than ideal. I use the same tag structure with clips as I do with DT documents-- some are associated with projects, others by type (see [part II](https://lachlankermode.com/associative-archiving-with-devonthink-2) for more detail on this structure). Ideally, I would like to filter for a project tag in DT, and see both all DT documents associated with that project, and also all of the hili clips I've tagged as relevant to that project. As per specification #5, I do want annotations to be somewhat separate from source documents: but if they're only available in an entirely different interface, it means that I would basically have to do every search twice; once in DT for documents, and then again in the hili webview for annotations.

While looking through [one of Francis' other projects](https://github.com/frnsys/rssrs) recently, I realised that I could have the best of both worlds using a tried-and-true technology (and perhaps my favourite data format for its collection of curiously coexisting qualities: relative obscurity, ubiquitousness, and decided simplicity): [RSS](https://en.wikipedia.org/wiki/RSS).

RSS is usually used to 'syndicate' news feeds from various sites, making all the content available all from single reader such as [Feedly](https://feedly.com/) or [Newsboat](https://newsboat.org/). The format it uses for news items, however, is also almost perfect to represent a document annotation. It contains some header text, a description, a source URL, and a set of tags that can be used to categorise the item.

Moreover, DT supports RSS feeds in such a way that item tags are automatically attributed as DT tags. This means that if I tag a clip as 'infraspace' when reading, when that clip comes into DT as an RSS item, it'll automatically be associated with all of the other content in that project. Making my clips available as an RSS feed gives the best of all worlds: I can clip from anywhere, view clips in HTML at a glance (if I'm not at my Mac), but also keep all clips as integrated and distinct items within my archive.

It also means I get the full power of DT search for my clips, so I don't need to think about developing a new UI to group all those related to a particular document, say, or all those that have a particular tag, or all those that I clipped during a particular time period. They show up beautifully in project workspaces, with a distinct type (HTML text) that doesn't overlap with other documents in my archive (as RTF annotations sometimes did with Word docs), and one click away from their source documents like the HTML view.

<div class="m-15" style="display:flex;justify-content:center;align-items:center;">
    <img src="static/clips-rss-in-dt.png" width="100%">
</div>

## More to come...
Francis and I are [working on](https://github.com/frnsys/hili/pull/8) integrating our hilis, which might lead to it becoming a more stable tool for folks not familiar with Python and HTTP requests at some point: but if you're not afraid of Python and want to try it, please do! I'd be very happy to hear about and help anyone who's interested  to mess around with it ([email me](mailto:lachiekermode@gmail.com) or [open an issue on Github](https://github.com/breezykermo/hili) if you run into trouble).
