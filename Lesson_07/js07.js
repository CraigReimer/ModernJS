"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Chapter case   

      Word Cloud  Generator
      Author:     Craig Reimer
      Date:       10-11-23

      Filename:   js07.js
 */

document.getElementById("getFile").onchange = function() {
      let userFile = this.files[0];
      // verify a text file is selected
      try {
            let isText = userFile.type.startsWith("text");
            if (!isText) {
                  throw userFile.name + " is not a text file";
            }

            // read the contents of the selected file
            let reader = new FileReader();
            reader.readAsText(userFile);

            // once finished loading, display on the page
            let sourceDoc = document.getElementById("wc_document");
            reader.onload = function() {
                  sourceDoc.innerHTML = reader.result;
                  let sourceText = sourceDoc.textContent; // store the doc, removing HTML tags

                  wordCloud(sourceText);
            }
      }

      // alert the user to select a text file
      catch(err) {
            window.alert(err)
      }

      function wordCloud(sourceText) {
            sourceText = sourceText.toLowerCase();
            sourceText = sourceText.trim();

            // leave only alphabet characters and whitespace
            let alphaRegx = /[^a-zA-Z\s]/g;
            sourceText = sourceText.replace(alphaRegx, "");

            // remove stop words
            for (let i = 0;i < stopWords.length; i++) {
                  let stopRegx = new RegExp("\\b"+stopWords[i]+"\\b", "g");
                  sourceText = sourceText.replace(stopRegx, "");
            }

            // place the remaining words in an array
            let words = sourceText.split(/\s+/g)

            words.sort();

            // create a 2D array in which each item is a word and its dupe count
            let unique = [ [words[0], 1] ];

            let uniqueIndex = 0;

            for (let i = 1; i < words.length; i++) {
                  if (words[i] === words[i-1]) {
                        // increase dupe count
                        unique[uniqueIndex][1]++;
                  } else {
                        // add a new word to the unique array
                        uniqueIndex++;
                        unique[uniqueIndex] = [words[i], 1];
                  }
            }

            // sort by descending order of duplicate count
            unique.sort(byDuplicate);
            function byDuplicate(a,b) {
                  return b[1] - a[1];
            }

            // keep the top 100 words
            unique = unique.slice(0, 100);

            // find dupes of the most repeated word
            let maxCount = unique[0][1];

            // sort the word list in alphabetic order
            unique.sort();

            // reference the word cloud box
            let cloudBox = document.getElementById("wc_cloud");
            cloudBox.innerHTML = "";

            // size each word based on its usage
            for (let i = 0; i < unique.length; i++) {
                  let word = document.createElement("span");
                  word.textContent = unique[i][0];
                  word.style.fontSize = unique[i][1]/maxCount + "em"
                  cloudBox.appendChild(word);
            }

      }
}





























/*--- ----------------------------------------------*/
/* Array of words to NOT include in the word cloud */
/*-------------------------------------------------*/

let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", 
                 "ago", "all", "almost", "alone", "along", "already", "also", "although", 
                 "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", 
                 "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", 
                 "are", "around", "as", "at", "back", "be", "became", "because", "become", 
                 "becomes", "becoming", "been", "before", "beforehand", "behind", "being", 
                 "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", 
                 "but", "by", "call", "came", "can", "cannot", "cant", "case","cases","cause", 
                 "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", 
                 "do", "does", "doing", "done", "down", "due", "during", "each", "eg", "eight", 
                 "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", 
                 "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fie",
                 "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", 
                 "formerly", "forty", "found", "four", "from", "front", "full", "further", 
                 "get", "give", "go", "had", "has", "hasnt", "have", "he", "held", "having", 
                 "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", 
                 "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", 
                 "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", 
                 "keep", "know", "knows", "knew", "last", "latter", "latterly", "least", "less", 
                 "let", "ltd", "made", "make","many", "may", "me", "meanwhile", "might", "mill", 
                 "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", 
                 "myself", "name", "namely", "neither", "never", "nevertheless", "next", 
                 "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", 
                 "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", 
                 "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", 
                 "own", "part", "per", "perhaps", "plainly", "please", "precisely", "put", 
                 "rather", "re", "same", "said", "say", "says", "see", "seem", "seemed", 
                 "seeming", "seems", "serious", "several", "shall", "she", "should", "show", 
                 "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", 
                 "something", "sometime", "sometimes", "somewhere", "st", "sts", "still", "such", 
                 "system", "take", "ten", "th", "ths", "thx", "than", "that", "the", "their", 
                 "them", "themselves", "then", "thence", "there", "thereafter", "thereby", 
                 "therefore", "therein", "thereupon", "these", "they", "thick", "thin", 
                 "third", "this", "those", "though", "three", "through", "throughout", 
                 "thru", "thus", "to", "together", "too", "top", "toward", "towards", 
                 "twelve", "twenty", "two", "un", "unless", "under", "until", "up", 
                 "upon", "us", "very", "via", "was", "we", "well", "were", "weve", "what", 
                 "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", 
                 "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", 
                 "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", 
                 "with", "within", "without", "would", "year", "years", "yet", "you", 
                 "your", "yours", "yourself", "yourselves"];
                 