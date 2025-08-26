"use client"

import { useState } from "react"

export function FontShowcase() {
  const [activeFont, setActiveFont] = useState("inter")
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveFont("inter")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeFont === "inter" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Inter (Default)
        </button>
        <button 
          onClick={() => setActiveFont("geist")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeFont === "geist" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Geist
        </button>
        <button 
          onClick={() => setActiveFont("mono")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeFont === "mono" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Monospace
        </button>
      </div>
      
      <div className={`${activeFont === "inter" ? "font-sans" : ""} ${activeFont === "geist" ? "font-geist" : ""} ${activeFont === "mono" ? "font-mono" : ""}`}>
        <h1 className="text-4xl font-bold mb-4">Typography Showcase</h1>
        <p className="text-lg mb-6">
          This demonstrates our improved font system. Inter is now the default font for better readability, 
          with Geist and monospace as alternatives.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Headings</h2>
            <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
            <h2 className="text-3xl font-semibold mb-2">Heading 2</h2>
            <h3 className="text-2xl font-medium mb-2">Heading 3</h3>
            <h4 className="text-xl font-medium mb-2">Heading 4</h4>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">Text Samples</h2>
            <p className="mb-3">
              Regular paragraph text with improved readability and spacing.
            </p>
            <p className="text-muted-foreground mb-3">
              Muted text for secondary information and descriptions.
            </p>
            <code className="bg-muted px-2 py-1 rounded">
              Monospace text for code snippets
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}