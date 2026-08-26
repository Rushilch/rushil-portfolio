"use client";

import React, { useState } from "react";
import { Layout, ArrowLeftRight, FileCode, CheckSquare, Plus, Trash2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  priority: "High" | "Normal";
}

export function MvvmDiagram() {
  const [tasks, setTasks] = useState<TodoItem[]>([
    { id: 1, title: "Implement INotifyPropertyChanged base class", isCompleted: true, priority: "High" },
    { id: 2, title: "Wire RelayCommand to AddTaskButton", isCompleted: true, priority: "High" },
    { id: 3, title: "Optimize ObservableCollection UI dispatching", isCompleted: false, priority: "Normal" },
  ]);

  const [newTaskInput, setNewTaskInput] = useState("");
  const [selectedLayer, setSelectedLayer] = useState<"view" | "vm" | "model">("vm");

  const toggleTask = (id: number) => {
    sound.playSelect();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const addTask = () => {
    if (!newTaskInput.trim()) return;
    sound.playSelect();
    const item: TodoItem = {
      id: Date.now(),
      title: newTaskInput.trim(),
      isCompleted: false,
      priority: "Normal",
    };
    setTasks((prev) => [...prev, item]);
    setNewTaskInput("");
  };

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Layout className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold uppercase tracking-wider">
            C# / WPF MVVM Architecture &bull; Clean Separation
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#10b981]">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Two-Way Data Binding Active</span>
        </div>
      </div>

      {/* Layer Architecture Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-6 font-mono">
        <button
          onClick={() => {
            sound.playSelect();
            setSelectedLayer("view");
          }}
          onMouseEnter={() => sound.playHover()}
          className={`p-3 rounded-lg border-2 text-left transition-all ${
            selectedLayer === "view"
              ? "bg-[#111726] border-[#00d2ff] text-slate-100 shadow-[0_0_15px_rgba(0,210,255,0.3)]"
              : "bg-[#0c101c] border-slate-800 text-slate-400 hover:border-slate-700"
          }`}
        >
          <div className="text-[10px] text-[#00d2ff] uppercase font-bold">Layer 01</div>
          <div className="font-bold text-xs text-slate-200 mt-0.5">View (XAML)</div>
          <p className="text-[10px] text-slate-500 mt-1">Declarative UI layout</p>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            setSelectedLayer("vm");
          }}
          onMouseEnter={() => sound.playHover()}
          className={`p-3 rounded-lg border-2 text-left transition-all ${
            selectedLayer === "vm"
              ? "bg-[#111726] border-[#6366f1] text-slate-100 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              : "bg-[#0c101c] border-slate-800 text-slate-400 hover:border-slate-700"
          }`}
        >
          <div className="text-[10px] text-[#6366f1] uppercase font-bold">Layer 02</div>
          <div className="font-bold text-xs text-slate-200 mt-0.5">ViewModel (C#)</div>
          <p className="text-[10px] text-slate-500 mt-1">Observable collections &amp; ICommand</p>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            setSelectedLayer("model");
          }}
          onMouseEnter={() => sound.playHover()}
          className={`p-3 rounded-lg border-2 text-left transition-all ${
            selectedLayer === "model"
              ? "bg-[#111726] border-[#10b981] text-slate-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              : "bg-[#0c101c] border-slate-800 text-slate-400 hover:border-slate-700"
          }`}
        >
          <div className="text-[10px] text-[#10b981] uppercase font-bold">Layer 03</div>
          <div className="font-bold text-xs text-slate-200 mt-0.5">Model (POCO)</div>
          <p className="text-[10px] text-slate-500 mt-1">Pure domain objects</p>
        </button>
      </div>

      {/* Interactive Simulation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-[#070a12] border-2 border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span>Simulated WPF Window</span>
              <span className="text-[10px] text-[#10b981] font-mono font-bold">Tasks: {tasks.length}</span>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Enter task item..."
                className="bg-[#111726] border border-[#1e293b] text-xs text-slate-200 px-3 py-1.5 rounded flex-1 focus:outline-none focus:border-[#00d2ff]"
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <button
                onClick={addTask}
                onMouseEnter={() => sound.playHover()}
                className="bg-[#6366f1] hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1 font-mono font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> ADD
              </button>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center justify-between p-2 rounded bg-[#0c101c] border border-slate-800 hover:border-[#00d2ff] cursor-pointer text-xs transition-all font-mono"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTask(task.id)}
                      className="accent-[#10b981] cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={task.isCompleted ? "line-through text-slate-500" : "text-slate-200"}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-[#6366f1]">
              <FileCode className="w-3.5 h-3.5" />
              {selectedLayer === "view"
                ? "Views/MainWindow.xaml"
                : selectedLayer === "vm"
                ? "ViewModels/TodoViewModel.cs"
                : "Models/TodoItem.cs"}
            </span>
            <span className="text-slate-500 text-[10px]">C# .NET</span>
          </div>

          {selectedLayer === "view" && (
            <pre className="text-[#00d2ff] text-[11px] leading-relaxed">
{`<ListBox ItemsSource="{Binding Tasks}">
  <ListBox.ItemTemplate>
    <DataTemplate>
      <CheckBox 
        Content="{Binding Title}" 
        IsChecked="{Binding IsCompleted, Mode=TwoWay}" />
    </DataTemplate>
  </ListBox.ItemTemplate>
</ListBox>`}
            </pre>
          )}

          {selectedLayer === "vm" && (
            <pre className="text-[#6366f1] text-[11px] leading-relaxed">
{`public class TodoViewModel : ViewModelBase
{
  public ObservableCollection<TodoItem> Tasks { get; }
  public ICommand AddTaskCommand { get; }

  public TodoViewModel() {
    Tasks = new ObservableCollection<TodoItem>();
    AddTaskCommand = new RelayCommand(ExecuteAddTask);
  }
}`}
            </pre>
          )}

          {selectedLayer === "model" && (
            <pre className="text-[#10b981] text-[11px] leading-relaxed">
{`public class TodoItem : INotifyPropertyChanged
{
  public int Id { get; set; }
  public string Title { get; set; }
  
  private bool _isCompleted;
  public bool IsCompleted {
    get => _isCompleted;
    set {
      _isCompleted = value;
      OnPropertyChanged(nameof(IsCompleted));
    }
  }
}`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
