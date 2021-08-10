import ScreeningTask from './index';

test('Case 1: task[], dependencies[], result[]', () => {
  expect(ScreeningTask([], [])).toEqual([]);
});
test('Case 2: task["a", "b"], dependencies[], result["a", "b"]', () => {
  expect(ScreeningTask(["a", "b"], [])).toEqual(["a", "b"]);
});
test('Case 3: task["a", "b"], dependencies["a => b"], result["b", "a"]', () => {
  expect(ScreeningTask(["a", "b"], ["a => b"])).toEqual(["b", "a"]);
});
test('Case 4: task["a", "b", "c", "d"], dependencies["a => b", "c => d"], result["b", "a", "d", "c"]', () => {
  expect(ScreeningTask(["a", "b", "c", "d"], ["a => b", "c => d"])).toEqual(["b", "a", "d", "c"]);
});
test('Case 5: task["a", "b", "c"], dependencies["a => b", "b => c"], result["c", "b", "a"]', () => {
  expect(ScreeningTask(["a", "b", "c"], ["a => b", "b => c"])).toEqual(["c", "b", "a"]);
});
test('Case 6: task["a", "b", "c", "d"], dependencies["a => b", "b => c", "c => a"], result["Error - this is a cyclic dependency"]', () => {
  expect(ScreeningTask(["a", "b", "c", "d"], ["a => b", "b => c", "c => a"])).toEqual("Error - this is a cyclic dependency");
});
