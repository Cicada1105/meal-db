import { ImageCard } from '../';

function ImageLoadingCards() {
  const emptyLoadingPath = {
    from:"",
    to:""
  }
  
  return (
    <>
      <ImageCard text="Loading..." location={emptyLoadingPath} />
      <ImageCard text="Loading..." location={emptyLoadingPath} />
      <ImageCard text="Loading..." location={emptyLoadingPath} />
      <ImageCard text="Loading..." location={emptyLoadingPath} />
    </>
  );
}

export { ImageLoadingCards }