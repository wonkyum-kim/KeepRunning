'use client';
/*
<div style="position:relative;overflow:hidden;width:100%;padding-top:56.25%;min-height:720px"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;" src="https://runrepeat.com/calculator/runner-performance" frameborder="0"></iframe></div>
*/

export default function Stat() {
  return (
    <div className='relative overflow-hidden w-full min-h-[720px]'>
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        src='https://runrepeat.com/calculator/runner-performance'
      ></iframe>
    </div>
  );
}
