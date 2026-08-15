import { useMemo, useState } from "react";
import { DAILY_TASKS } from "../data/dailies";
import type { DailyTaskCategory } from "../types/dailies";
import { useDailiesStore } from "../state/useDailiesStore";
import { Panel } from "../components/common/Panel";
import { ProgressBar } from "../components/common/ProgressBar";
import { DailyRow } from "../components/dailies/DailyRow";

const CATEGORY_ORDER: DailyTaskCategory[] = ["Farming", "Resource Runs", "Misc"];

export function DailiesPage() {
  const isChecked = useDailiesStore((s) => s.isChecked);
  const toggle = useDailiesStore((s) => s.toggle);
  const customTasks = useDailiesStore((s) => s.customTasks);
  const addCustomTask = useDailiesStore((s) => s.addCustomTask);
  const removeCustomTask = useDailiesStore((s) => s.removeCustomTask);
  const [newTask, setNewTask] = useState("");

  const allTasks = useMemo(() => [...DAILY_TASKS, ...customTasks], [customTasks]);
  const done = allTasks.filter((t) => isChecked(t.id)).length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Dailies</h1>
          <p className="mt-1 text-sm text-slate-400">
            Resets every day at 00:00 UTC (the OSRS daily reset).
          </p>
        </div>
        <div className="flex min-w-[200px] items-center gap-2">
          <ProgressBar value={allTasks.length ? (done / allTasks.length) * 100 : 0} />
          <span className="flex-none text-sm text-slate-400">
            {done}/{allTasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const tasks = allTasks.filter((t) => t.category === category);
          if (tasks.length === 0) return null;
          return (
            <div key={category}>
              <h2 className="mb-2 text-sm font-semibold tracking-wide text-slate-400 uppercase">
                {category}
              </h2>
              <Panel>
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <DailyRow
                      key={task.id}
                      task={task}
                      checked={isChecked(task.id)}
                      onToggle={() => toggle(task.id)}
                      onRemove={
                        task.id.startsWith("custom-") ? () => removeCustomTask(task.id) : undefined
                      }
                    />
                  ))}
                </ul>
              </Panel>
            </div>
          );
        })}
      </div>

      <form
        className="mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTask.trim()) return;
          addCustomTask(newTask.trim());
          setNewTask("");
        }}
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a custom daily task..."
          className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400"
        >
          Add
        </button>
      </form>
    </div>
  );
}
