/**
* Convert all lazy loaded images into eager
*/
export function UnLazyLoad( tags=[ "iframe", "img"], loading= "eager", condition= ""){
	const selector= tags.map( t=> `${t}${condition}`).join( ",")
	for( const el of document.querySelectorAll( selector).values()){
		el.setAttribute( "loading", loading)
	}
}
export {
  UnLazyLoad as unLazyLoad
}
export default UnLazyLoad
