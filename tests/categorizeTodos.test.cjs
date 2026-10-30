const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

// Exercise the pure helper without mounting React or accessing browser storage.
const source = fs.readFileSync(
  path.join(__dirname, "../src/components/tiles/TodoListTile.tsx"), "utf8"
);
const helper = source.slice(
  source.indexOf("const categorizeTodos ="),
  source.indexOf("const toggleCollapseAllCategories =")
);
const context = {};
vm.runInNewContext(ts.transpileModule(
  helper + "\nglobalThis.categorizeTodos = categorizeTodos;",
  { compilerOptions: { target: ts.ScriptTarget.ES2020 } }
).outputText, context);
const categorize = (todos) => JSON.parse(JSON.stringify(context.categorizeTodos(todos)));

test("nested completed items appear only in the flat completed list", () => {
  const todos = [{ date: 1, done: false, isCategory: true, subTodoListItems: [
    { date: 2, done: false, isCategory: true, subTodoListItems: [
      { date: 3, done: true }, { date: 4, done: false }
    ] }
  ] }];
  const original = JSON.stringify(todos);
  const result = categorize(todos);
  assert.deepEqual(result.unfinishedTodos[0].subTodoListItems[0].subTodoListItems.map(t => t.date), [4]);
  assert.deepEqual(result.finishedTodos.map(t => t.date), [3]);
  assert.equal(JSON.stringify(todos), original);
});

test("completed parents are flattened and pending children remain visible", () => {
  const result = categorize([{ date: 1, done: true, subTodoListItems: [
    { date: 2, done: true }, { date: 3, done: false }
  ] }]);
  assert.deepEqual(result.finishedTodos.map(t => t.date), [1, 2]);
  assert.ok(result.finishedTodos.every(t => t.subTodoListItems.length === 0));
  assert.deepEqual(result.unfinishedTodos.map(t => t.date), [3]);
});
