package main

import (
	"bytes"
	"errors"
	"log"
	"os"
	"io"
	"io/ioutil"
	"fmt"
	"golang.org/x/net/html"
	"strings"
)

const templateFile string = "index.html"

func getBody(doc *html.Node) (*html.Node, error) {
	var b *html.Node
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "body" {
			b = n
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(doc)
	if b != nil {
		return b, nil
	}
	return nil, errors.New("Missing <body> in the node tree")
}

func renderNode(n *html.Node) string {
	var buf bytes.Buffer
	w := io.Writer(&buf)
	html.Render(w, n)
	return buf.String()
}

func parseHtml(htm string) {
	doc, _ := html.Parse(strings.NewReader(htm))
	bn, err := getBody(doc)
	if err != nil {
		return
	}
	body := renderNode(bn)
	fmt.Println(body)
}


func readFile() {
	fileReader, err := os.Open(templateFile)
	if err != nil {
		log.Fatal(err)
	}
	defer fileReader.Close()

	content, err := ioutil.ReadAll(fileReader)
	if err != nil {
		log.Fatal(err)
	}
	parseHtml(string(content[:]))

	fmt.Println("Number of bytes read", len(content))
	fmt.Printf("Data as string : %s", content)
}

func main() {
	readFile()
}
