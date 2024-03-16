import React from 'react';
// import image from 'next/image';

const images = [
    { src: 'hourglass-end.png', description: 'Duration' },
    { src: 'calendar.png', description: 'Date' },
    { src: 'layers.png', description: 'Level' },
    { src: 'browser.png', description: 'Cost' },
    { src: 'list.png', description: 'Prerequisites' },
    { src: 'layout-fluid.png', description: 'Projects' },
];


const BlockchainSection = () => {
    return (
        <div>
            <div class="flex justify-center items-center w-1440 px-281 py-84 md:py-71">
                <div class="grid grid-cols-3 gap-20 w-878 justify-center items-center content-center gap-75 flex-shrink-0 ">
                    {images.map((image, index) => (
                        <div class="flex flex-col justify-center items-center w-229 h-241 p-10 gap-30 flex-shrink-0 rounded-lg border border-solid border-orange-200">
                            <div class="flex justify-center items-center w-65 h-65 flex-shrink-0">
                                <img src={image.src} alt={`Image ${index + 1}`} />
                            </div>
                            <div class="self-stretch text-black text-center font-poppins font-semibold text-base leading-normal opacity-75">
                                <p class="mt-2 text-sm">{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
 
        </div>
    )
}

export default BlockchainSection