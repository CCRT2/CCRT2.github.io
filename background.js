const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove",(e)=>{

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob,index)=>{

        const speed = (index + 1) * 15;

        blob.style.transform =
        `translate(${x*speed}px, ${y*speed}px)`;

    });

});
