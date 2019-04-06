export class Interrupted extends Error{}
export const ProgressiveUnLazyLoadState= Symbol.for("ProgressiveUnLazyLoad")

/**
* Store the 
*/
export function ProgressiveUnLazyLoad(loading= "eager", condition= "", startLevel= 1){
	const selector= tags.map( t=> `${t}${condition}`).join( ",")
	let
	  loading= 0, // number of elements currently loading
	  loaded= Deferrant(),
	  currentLevel= startLevel // current level
	function loaded(){
		--loading
		if( loading=== 0){
			loaded.resolve()
		}
	}
	function getState( el, level= currentLevel){
		const existingState= el[ ProgressiveUnLazyLoadState]
		if( existingState){
			return existingState
		}
		const newState= el[ ProgressiveUnLazyLoadState]= {
			level,
			sizes: el.sizes,
			srcset: el.srcset
		}
		return newState
	}
	function setLevel( el, state){
		// set sizes and srcset lists of el to have the first level entries
	}
	for( const el of document.querySelectorAll( selector).values()){
		if( loading!== false){
			el.lazyLoad= loading
		}
		if( !el.complete){
			const state= getState( el)
			// this will "truncate" the level-of-quality
			setLevel( el, state)
		}
		// complete may have changed via the above setLevel, re-check
		if( !el.complete){
			++loading
		}
	}

	function next(){
		return step( 1)
	}
	function best(){
		return step( Number.POSITIVE_INFINITY)
	}
	function step( n){
		if( loading){
			loaded.reject( new Interrupted())
		}

		loading= 0
		loaded= Deferrant()
		currentLevel+= n
		for( const el of document.querySelectorAll( selector).values()){
			const
			  state= getState( el),
			  { level, sizes, srcset}= state
			if( level< currentLevel){
				state.level= currentLevel
				setLevel( el, state)
			}
			if( !el.complete){
				loading++
			}
		}
		return finish()
	}

	function finish(){
		if( loading=== 0){
			currentLevel= Number.POSITIVE_INFINITY
			loaded.resolve()
		}
		return {
		  // state
		  currentLevel,
		  loaded,
		  done: currentLevel=== Number.POSITIVE_INFINITY,
		  // methods
		  next,
		  step,
		  best
		}
	}
	return finish()
}
export {
  ProgressiveUnLazyLoad as progressiveUnLazyLoad,
  ProgressiveUnLazyLoad as Progressive,
  ProgressiveUnLazyLoad as progressive,
}
export default ProgressiveUnLazyLoad
