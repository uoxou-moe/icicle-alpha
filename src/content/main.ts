import { categorize } from "../logic/categorize";

console.log('[CRXJS] Hello world from content script!')

Array.from(document.getElementsByTagName("button")).forEach(element => {
	console.log('Button categorized:', `${element.id}`, categorize(getComputedStyle(element)));
});
