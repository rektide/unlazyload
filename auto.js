import ProgressiveUnLazyLoad from "./progressive.js"
import Deferrant from "deferrant"

export async function start( advance= Number.POSITIVE_INFINITY){
	let cursor= ProgressiveUnLazyLoad()
	while( !cursor.done){
		await cursor.loaded
		cursor= cursor.next( advance)
	}
	await cursor.loaded
}

/**
* Wait until the page settles, then progressively load content until done
*/
export function Auto( advance= Number.POSITIVE_INFINITY){
	if( document.readySate=== "complete"){
		return start( advance)
	}else {
		const done= Deferrant()
		document.addEventListener( "loaded", function(){
			start( advance)
			done.resolve()
		})
		return done
	}
}
export {
  Auto as auto
}
export default Auto
