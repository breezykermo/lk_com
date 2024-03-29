---
title: "Associative Archiving with DEVONthink: Part I"
url: associative-archiving-with-devonthink-1 
date: 2020-02-28
---
I've been using [DEVONthink](https://www.devontechnologies.com/apps/devonthink)
(DT) idly for almost two years now. For those who aren't familiar with the
application, you can basically think of it as an extra layer on top of the Mac
operating system for working with documents (PDF, images, RTF, etc) more
effectively. It has inbuilt PDF viewing and annotation, facilities for syncing
documents between computers and tablets (iOS only), powerful search capacities,
lateral tagging to associate documents with each other, and-- most
importantly-- a scripting API to create custom workflows.


I've recently been ironing my reading, writing, and archiving workflow.  It's
designed primarily with seminars, essays, and book-length projects in the
humanities in mind-- but I've tried to make it general and flexible enough to
work with other contexts, such as scientific reading, as well.

This is a two-part post. Here in part I, I'll present a specification of how
I want to read, write, and archive in abstract terms. In [Part II](/associative-archiving-with-devonthink-2), I'll detail
the way that I've configured and customized DT to implement that spec in
practice. I hope this can be helpful/instructive for some folks out there who
similarly work with networks of citations in reading and writing projects, or
who keep a personal archive of PDFs. 

A note for readers looking to use the configurations and scripts in Part II: DT
is not free, and it's Mac-only. (I'm looking into virtualising it so that I can
run it in Linux, but that project is yet to begin.) There is a generous
150-hour free trial, but after that you'll need to make one-off payment of $99
USD for the standard version on desktop.  I'm more than willing to pay for good
software like DT, and you should be too.  Developing and maintaining software
takes time and effort. I'm very grateful to the folks at DEVONthink keeping up
with the community, and keeping the software feature-rich and flexible.

### Projects 

My archival philosophy is built on the principle of projects. At any given
time, I have a number of projects underway. A project might be an idea for an
essay, an essay I'm actively writing, a coding project, a reading group, a talk
I'm preparing- essentially any undertaking that collects together relevant
links, quotes, notes, texts, and other files. 

These projects much more actively organise my archive than perhaps more
familiar taxonomic concepts such as author or date. When I'm reading and
writing, I store relevant information in my archive according to where it's
going in my work-- in projects-- rather than where it's coming from. Say I'm
reading a book, and a particular paragraph sticks out at me as a relevant
reference for an essay I'm writing: I want to save that quote (and perhaps some
relevant additional thoughts regarding why the quote is relevant) in the essay
as a project. Provided I can get back to the correct page in the source
document from what I save, I don't need to file the entire book in the project;
just the relevant quotes and my additional annotations.

When I go to work on a project, I can bring up its file of quotations,
annotations, and my own personal notes. Quotations are hyperlinked to their
source text, so that I can go to its origin to cite or further explore, but my
main project workspace is a readily-accessible collection of relevant quotes
and notes.

A single note/quote could be relevant to arbitrarily many projects.  Notes can
exist in a project without a source document, thoughts that occur to me in the
course of conversations and everyday life. The source documents might be either
a PDF or a webpages. (Hardcopy books can't be hyperlinked, so quotes for these
are just traditionally referenced by page number).

### Project workspaces 

When I open up project workspace, I want to be able to easily and immediately
view all of the relevant quotes and notes. I want to be able to dynamically
search through the workspace in a number of ways: for particular text,
filtering to only notes from a particular book, only notes from a particular
author, only notes written after a certain date, etc. In other words, the
project workspace search is where I need the more traditional taxonomic notions
to organise my files. I don't want to have to click through nested file
structures to get to relevant notes, but instead be able to flexibly filter and
compose notes.

The notes in projects should contain everything I need to use and expand the
thought in a project. The project workspace is where I sift through these
thoughts, putting them to use in the project, whether that be towards code,
writing, conversation, or whatever else. 


### An associative archive 

Projects are the main way to interface the archive for writing. However, I also
want to be able to search through the archive as a whole, without limiting
search results to the confines of a project. This search should, like the
search in project workspaces, be similarly flexible and support search by
author, by date added, etc.

Crucially, I also want to be able to add durable filters to the archive's
search space. For example, I might want to be able to see all notes and
documents from a particular seminar, all those published by University of
California Press, or all those that come recommended by a particular person.
A document or note can have an arbitrary number of these tags, so that it can
be infinitely associated with other items in relevant groupings.

This notion of flexible and associative tagging essentially replaces the need
for folders in the archive. Folders seem to tend towards nested hierarchical
structures of organisation. I try to keep _as few hierarchical layers as
possible_ in my tagging system. This keeps me diligent regarding the tags I add
to my archive, encouraging fewer of them and ensuring that the ones I do add
are expressive and memorable. 

### The inbox 

The only extra capacity this system needs is a clean, clear workflow for adding
new documents to the archive, reading them, and then marking them as 'done'.
I work through documents like I work through email. They enter into an inbox,
and I read them there, creating new quotes and notes in different projects as
I read. When I'm done, I flick them into the archive. Documents either come
into my inbox fresh from somewhere else (the web or a hard drive). Or, if I'm
returning to a document to read a different chapter, or to read one again, it
might come back into my inbox from the archive. In other words, my inbox
consists of all the documents I'm actively reading. If I'm adding a bunch of
documents to my archive from elsewhere and _not_ immediately planning to read
them, they only hang out in my inbox for long enough to be tagged with any
relevant filters, and are then filed away. 


The idea that a document can be either a PDF or a webpage is crucial to how
this inbox works for me. For a long time I kept webpages to read in browser
bookmarks, and PDFs elsewhere, which inevitably ended up in never actually
reading bookmarked folders. Having a unified inbox for all my documents means
that I _have to_ work systematically through them to keep a clean inbox, just
like an email inbox.


Another important aspect my inbox is how it works with documents I read
elsewhere. I read almost all my PDFs, EPUBs, and MOBIs on my
[Remarkable](https://remarkable.com/), where I underline things and write in
the margins. When I've finished with a document on my Remarkable, I bring it
into my archive inbox, and browse quickly back through the marginalia. This
practice of 'second-reading' my own notes on a text helps to solidify what
I took from it, and gives me the opportunity to spin off relevant quotations
and marginalia as notes to projects. I have a system for reading with my
computer open as well, annotating and typing notes as I go through it, but
I largely prefer reading elsewhere (outside, in the sun!) and then
second-reading in my archive's inbox, before filing it away. Similarly, if
I take notes in notebooks on my remarkable, I second-read them in my archive
before filing.

---

In [Part II](/associative-archiving-with-devonthink-2), I'll explain how I have implemented the archive explained here in
practice with DEVONthink.
