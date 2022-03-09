import { prepareHandles } from './prepareHandles.mjs';

export function displayCategory(category) {
  const handles = prepareHandles();
  handles.category.textContent = `Category: ${category}`;
}
