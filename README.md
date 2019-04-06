# unlazyload

> Transition content to `loading=eager`

In April 2019, Google Chrome started automatically lazy loading content below the fold.

> Blink: Intent to Ship: Lazily load below-the-fold images and iframes
https://mobile.twitter.com/intenttoship/status/1114400371382812672

This library is intended to assist in getting content loaded in less-lazy manners. This insures that users have a ready-to-go experience.

# UnLazyLoad

UnLazyLoad converts all element into `loading=eager`. Typically it is run after the page loads:

```
document.onload= async ()=> (await import("unlazyload")).default()
```

# Progresive

Progressive mode attempts to get first a simpler srcset rendered, and then re-adds progressive srcset's. This is intended to get a complete page render, quickly, and then to go back and get higher level of quality images.

`srcset` and `sizes` attributes must be listed in increasing level-of-quality order.

# Enhancements

## Viewport - quality sensitivity

`lazyload` specification does not offer any feedback on whether an object is within range or not.

Ideally, it would, such that progressive mode can, as an object comes into view, immediately have it's level-of-quality bumped & potentially we could temporarily "kill" other content downloads during this time.

We can approximate the built-in `lazyload` behavior with Intersection Observers, to some degree.

## In-order loading

UnLazyLoad currently bulk updates all images and iframes. It could, for example, limit the max concurrency of content loads, while prioritizing content nearest to the users view.

## In progress downloads

Also limiting us in the inability to tell how far along an image download is. This prevents us from heuristics such as: "if a high quality image is >50% downloaded, do not reduce it's level of quality". Even knowing whether an image was downloading could be used to shape level-of-quality heurisitcs.

This could be worked around by using `fetch` to get images, and watching it's progress.
