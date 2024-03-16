import React from 'react'

const items = [
    {
        description: 'About this Course',
        src: 'plus-circle.png',
    },
    {
        description: 'What will you Learn',
        src: 'plus-circle.png',
    },
    {
        description: 'Prerequisites',
        src: 'plus-circle.png',
    },
    {
        description: 'Course Outline',
        src: 'plus-circle.png',
    },
    {
        description: 'Class Schedule',
        src: 'plus-circle.png',
    },
];

const ListItem = ({ item }) => (
    <div class=" flex-row  items-center flex-shrink-0">
        <div className='w-862 flex flex-row items-center  justify-around  h-20 text-black font-serif text-2xl font-bold'>
            <div class="flex  items-start basis-1/4 gap-5 mr-12 flex-shrink-0 ">
                <div className='w-80 h-11 relative space-x-7 gap-4 flex items-start'>
                    <h1 className='absolute bottom-4 text-5xl'>.</h1>
                    <p className='absolute'>{item.description}</p>
                </div>
            </div>
        <div className='ml-9  grid justify-items-end'>
            <img src={item.src} alt="image" width={24} height={24} />
        </div>
        </div>
    </div>
);

const BlockchainDetail = () => {
    return (
        <div>
            <div class="w-screen px-72 py-24 flex justify-around items-center">
                <div class="grid grid-rows-1 content-center space-x-80 justify-center items-center flex-shrink-0 flex-wrap">
                    <div class="">
                        {items.map((item, index) => (
                            <ListItem key={index} item={item} />
                        ))}
                    </div>
                    <div className="border border-orange-700 mt-5  rounded-lg w-48 h-14 flex justify-center items-center">
                        <div className="text-orange-700 font-poppins text-base font-medium">Apply Now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockchainDetail


