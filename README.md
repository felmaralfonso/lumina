# Lumina — Digital Curriculum Binder & Study Hub

Lumina is a sleek, modern web application designed for educators and students. It serves as a digital curriculum binder to organize lesson plans, handouts, and teaching resources, complete with interactive study tools like a Focus Timer, Notepad, Audio Broadcaster, and Live Annotation Blackboard.

---

## ⚠️ Important: Preparing Files for Upload

To ensure the best possible rendering and annotation experience on Lumina, please follow these file preparation guidelines:

### Convert Word & PowerPoint Files to PDF

* **Better Rendering & Layout Integrity**: Rich layouts, equations, custom fonts, and formatting in Word (`.docx`) or PowerPoint (`.pptx`) files may not render correctly if uploaded directly.
* **Full Annotation Support**: Live drawing and highlighter annotation tools are fully optimized for PDF documents.

> [!IMPORTANT]  
> **Always convert your Word (`.docx`) and PowerPoint (`.pptx`) files to PDF (`.pdf`) before uploading them to Lumina.**

#### How to Convert Files to PDF:
* **Microsoft Word / PowerPoint:** Go to **File** > **Save As** (or **Export**) and choose **PDF** as the format.
* **Google Docs / Slides:** Go to **File** > **Download** > **PDF Document (.pdf)**.
* **Pages / Keynote (macOS):** Go to **File** > **Export To** > **PDF...**.

---

## Key Features

1. **My Documents (Library):** Create folders, add student spaces, and organize your files.
2. **Live Document Annotation:** Open any PDF to enter **Presentation Mode**. Annotate directly on the document while screensharing to highlight key concepts.
3. **Draggable Focus Timer:** A floating pomodoro-style timer to track study sessions. Drag it anywhere on the screen or view it docked inside the right panel.
4. **Global Audio Player:** Stream background sounds or lesson audio seamlessly while browsing documents.
5. **Integrated Scratch Blackboard:** Toggle a side-by-side whiteboard interface to sketch and draw notes freehand.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Development Server

Install dependencies and start the local Vite development server:

```bash
npm install
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

### Build for Production

Compile and optimize the project for production:

```bash
npm run build
```

The built bundle will be located in the `dist/` folder.
