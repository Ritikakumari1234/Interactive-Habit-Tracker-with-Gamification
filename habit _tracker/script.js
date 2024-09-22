
    // Function to update the percentage on hover
    document.querySelectorAll('.graphBar').forEach((bar) => {
        const graph1 = bar.querySelector('.graph1');
        const graph2 = bar.querySelector('.graph2');
        const date = bar.querySelector('.date');
        const graphHeight1 = bar.querySelector('.graph1 + .graphHeight');
        const graphHeight2 = bar.querySelector('.graph2 + .graphHeight');

        // Hovering over graph1
        graph1.addEventListener('mouseenter', () => {
            date.innerText = graphHeight1.innerText; // Change date to graph1's height
        });
        graph1.addEventListener('mouseleave', () => {
            date.innerText = date.dataset.original; // Reset to original date
        });

        // Hovering over graph2
        graph2.addEventListener('mouseenter', () => {
            date.innerText = graphHeight2.innerText; // Change date to graph2's height
        });
        graph2.addEventListener('mouseleave', () => {
            date.innerText = date.dataset.original; // Reset to original date
        });
    });


    