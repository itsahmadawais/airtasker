# AirTasker

**AirTasker** is not just a Todo App—it's your complete daily planner that helps you organize and manage your tasks efficiently. Built with an enterprise-grade UI, it offers a professional experience for structuring your day.

## 🚀 Try It Live

You can use AirTasker for free at **[https://airtasker-seven.vercel.app/](https://airtasker-seven.vercel.app/)**. The app stores all your data in your browser using localStorage, ensuring your tasks persist across sessions while keeping your data private and secure.

![AirTasker App Screenshot](screenshots/app.png)

## Features

- **Enterprise-Grade UI** — Clean, professional design inspired by tools like Linear and Notion
- **Dark & Light Mode** — Toggle between themes with preferences saved automatically
- **Drag & Drop Reordering** — Reposition both parent tasks and sub-tasks with intuitive drag handles
- **Sub-Task Management** — Break tasks into smaller sub-tasks with independent completion tracking
- **Color-Coded Labels** — 8 color schemes to categorize and visually distinguish tasks
- **Persistent Storage** — All tasks, view preferences, and theme choices saved via `localStorage`
- **List & Grid Views** — Switch between layouts with your preference remembered across sessions
- **Filters** — Quickly filter by All, Active, or Completed tasks
- **Inline Editing** — Click any task or sub-task title to edit it in place
- **Responsive Design** — Works seamlessly across desktop, tablet, and mobile

## Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **@dnd-kit** | Drag-and-drop reordering |
| **localStorage** | Client-side data persistence |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsahmadawais/airtasker.git
   cd airtasker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment.

## How It Works

AirTasker runs entirely in the browser with zero backend dependencies:

- **Tasks & sub-tasks** are saved to `localStorage` and persist across sessions
- **View preference** (list/grid) is stored separately so your layout choice is remembered
- **Theme preference** (light/dark) is applied on load via a `data-theme` attribute on the root element, with all colors driven by CSS custom properties
- **Drag & drop** is powered by `@dnd-kit` with separate sortable contexts for parent tasks and sub-tasks within each card
- **Color schemes** are theme-aware — each color has light and dark variants that automatically switch with the theme

## Project Structure

```
src/
├── components/
│   ├── ColorPicker.tsx         # Color scheme popover
│   ├── SortableSubTaskItem.tsx # Drag wrapper for sub-tasks
│   ├── SortableTodoItem.tsx    # Drag wrapper for tasks
│   ├── SubTaskItem.tsx         # Sub-task row
│   ├── ThemeToggle.tsx         # Dark/light mode toggle
│   ├── TodoFilters.tsx         # Filter segmented control
│   ├── TodoForm.tsx            # Add task input
│   ├── TodoItem.tsx            # Task card
│   ├── TodoList.tsx            # Task list with DnD context
│   └── ViewToggle.tsx          # List/grid toggle
├── constants/
│   └── colorSchemes.ts         # Theme-aware color definitions
├── hooks/
│   └── useTodos.ts             # Task state & persistence logic
├── types/
│   └── todo.ts                 # TypeScript interfaces
├── App.tsx                     # Root layout
├── index.css                   # Design tokens & global styles
└── main.tsx                    # Entry point
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Author

Created with ❤️ by [Awais Ahmad](https://github.com/itsahmadawais/)
