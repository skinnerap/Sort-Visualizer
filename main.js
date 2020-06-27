/******** EVENT LISTENERS ************/
let speedController = document.getElementById('speed-controller');

let divsSelector = document.getElementById('generate-divs');
divsSelector.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    console.log(divHeight);

    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });

});

let bubbleBtn = document.getElementById('bubble-sort');
bubbleBtn.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });
    let divs = storeSortingDivs();
    bubbleSort(divs);
});

let insertionBtn = document.getElementById('insertion-sort');
insertionBtn.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });
    let divs = storeSortingDivs();
    insertionSort(divs);
});

let selectionBtn = document.getElementById('selection-sort');
selectionBtn.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });
    let divs = storeSortingDivs();
    selectionSort(divs);
});

let quickBtn = document.getElementById('quick-sort');
quickBtn.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });
    let divs = storeSortingDivs();
    displayQuickSortInfo();
    quickSort(divs, 0, divs.length-1);
});

/*
let mergeBtn = document.getElementById('merge-sort');
mergeBtn.addEventListener('click', () => {
    let num = speedController.value;
    let divHeight = window.screen.height / num;
    generateSortingDivs(num);
    let sortingDivs = document.querySelectorAll('.sorting-div');
    sortingDivs.forEach(d => {
        d.style.height = (divHeight / 2).toString() + 'px';
    });
    let divs = storeSortingDivs();
    displayMergeSortInfo();
    mergeSort(divs);
});
 */
/********* Generate and Store Divs to be Sorted *************/
const generateSortingDivs = (numOfDivs) => {
    const divContainer = document.querySelector('.div-container');
    let html = '';
    for (let i = 0; i < numOfDivs; i++) {
        let r = Math.floor(Math.random() * 100);
        html += `<div class='sorting-div' id='id-${i}' style='max-width: ${r}%'>&nbsp</div>`;
    }
    divContainer.innerHTML = html;
}

const storeSortingDivs = () => {
    const divContainer = document.querySelector('.div-container');
    let divCollection = [];
    const numOfDivs = divContainer.childElementCount;

    for(let i=0; i<numOfDivs; i++) {
        let div = document.getElementById('id-' + i);
        divCollection.push(div);
    }

    return divCollection;
}

/******** ON INITIALIZATION ********/
let num = speedController.value;
let divHeight = window.screen.height / num;
generateSortingDivs(num);
let sortingDivs = document.querySelectorAll('.sorting-div');
sortingDivs.forEach(d => {
    d.style.height = (divHeight / 2).toString() + 'px';
});

/********** SLEEP FUNCTION ************/
//Used to allow asynchronous visualizations of synchronous tasks
function sleep() {
    let ms = document.querySelector('#speed-con');
    let time = ms.max - ms.value;
    return new Promise(resolve => setTimeout(resolve, time));
}

/******* SWAP FUNCTIONS *********/
//Used for Testing Algorithm before Animating Visualization
const syncSwap = (div1, div2) => {
    let tmp = div1.style.maxWidth;
    div1.style.maxWidth = div2.style.maxWidth;
    div2.style.maxWidth = tmp;
}

async function asyncSwap(div1, div2) {
    await sleep();
    let tmp = div1.style.maxWidth;
    div1.style.maxWidth = div2.style.maxWidth;
    div2.style.maxWidth = tmp;
}

/****************************************/
/*********** SORTING ALGO'S *************/
/****************************************/

/******* BUBBLE SORT ***********/
async function bubbleSort(divCollection) {
    displayBubbleSortInfo();
    const len = divCollection.length;
    for(let i=0; i<len; i++) {
        for(let j=0; j<len-i-1; j++) {
            divCollection[j].style.backgroundColor = "#A45B77";
            divCollection[j+1].style.backgroundColor = "#635BA4";

            let numDiv1 = parseInt(divCollection[j].style.maxWidth);
            let numDiv2 = parseInt(divCollection[j+1].style.maxWidth);
            let div1 = divCollection[j];
            let div2 = divCollection[j+1];
            if(numDiv1 > numDiv2) {
                await asyncSwap(div2, div1);
            }
            divCollection[j].style.backgroundColor = "#5ba488";
            divCollection[j+1].style.backgroundColor = "#5ba488";
        }
        divCollection[len - i - 1].style.backgroundColor = '#5ba488';
    }


}

function displayBubbleSortInfo(){
    const infoDiv = document.querySelector('.algo-info');
    let html = `<h1>Bubble Sort Visualizer</h1>`;
    html += `<h2>Time Complexity: O(n^2)</h2>`;
    html += `<h3>Space Complexity: O(1)</h3>`;
    html += `<p class="algo-text">This sorting algorithm loops through the array and continues to push the 
               largest found element into the last position, also pushing the last available
               position down by one on each iteration. It is guaranteed to run in exactly 
               O(n^2) time because it is a nested loop that runs completely through.</p>`;
    infoDiv.innerHTML = html;
}

/****** QUICK SORT ********/
async function quickSort(divCollection, start, end) {
    if(start >= end) return;

    let partitionIndex = await partition(divCollection, start, end);

    await Promise.all([quickSort(divCollection, start, partitionIndex - 1), quickSort(divCollection, partitionIndex + 1, end)]);
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
async function partition(divCollection, start, end) {
    let pivotIndex = start;
    let pivotValue = parseInt(divCollection[end].style.maxWidth);
    for(let i = start; i < end; i++) {
        if(parseInt(divCollection[i].style.maxWidth) < pivotValue) {
            await asyncSwap(divCollection[i], divCollection[pivotIndex]);
            pivotIndex++;
        }
    }
    await asyncSwap(divCollection[pivotIndex], divCollection[end]);
    return pivotIndex;
}

function displayQuickSortInfo(){
    const infoDiv = document.querySelector('.algo-info');
    let html = `<h1>Quick Sort Visualizer</h1>`;
    html += `<h2>Time Complexity: O(n log n)</h2>`;
    html += `<h3>Space Complexity: O(log n)</h3>`;
    html += `<p class="algo-text">This sorting algorithm uses the idea of a partition to sort
                each iteration recursively. You can implement quick sort
                in a variety of manners based on the method in which you
                pick your "pivot" value to partition the array. In this
                visualization, I implemented the method that chooses the 
                last element of the array as the pivot value. You could
                also choose the first value, the middle value, or the median
                value based on the first, middle, and last values.</p>`;
    infoDiv.innerHTML = html;
}

/************* INSERTION SORT *************/


async function insertionSort(divCollection) {
    displayInsertionSort();
    for(let i=1; i<divCollection.length; i++) {
        let j = i;
        while(j > 0 && (parseInt(divCollection[j-1].style.maxWidth) > parseInt(divCollection[j].style.maxWidth))) {
            await asyncSwap(divCollection[j], divCollection[j-1]);
            j--;
        }
    }
}

function displayInsertionSort() {
    const infoDiv = document.querySelector('.algo-info');
    let html = `<h1>Insertion Sort Visualizer</h1>`;
    html += `<h2>Time Complexity: O(n^2)</h2>`;
    html += `<h3>Space Complexity: O(1)</h3>`;
    html += `<p class="algo-text">This sorting algorithm is similar to how we
                                  like to sort a deck of cards. We iterate through
                                  the array, and at each element we check behind it
                                  to see where in the array it should go. This keeps
                                  a partitioned sorted subarray in the front continuously
                                  until we finish sorting. This algorithm does not allocate
                                  new memory, only using swaps to sort. It has a best case
                                  time complexity of O(n) but an average time complexity
                                  of O(n^2).</p>`;
    infoDiv.innerHTML = html;
}

/************ SELECTION SORT *************/

async function selectionSort(divCollection) {
    displaySelectionSort();
    for(let i=0; i<divCollection.length - 1; i++) {
        let unsortedIndex = i;
        let currMinIndex = i;
        let unsortedNum = parseInt(divCollection[unsortedIndex].style.maxWidth);
        for(let j=i+1; j<divCollection.length; j++) {
            let num = parseInt(divCollection[j].style.maxWidth);
            if(num < unsortedNum) {
                currMinIndex = j;
                unsortedNum = parseInt(divCollection[currMinIndex].style.maxWidth);
            }
        }
        if(divCollection[unsortedIndex] !== divCollection[currMinIndex]) {
            await asyncSwap(divCollection[unsortedIndex], divCollection[currMinIndex]);
        }
    }
}

function displaySelectionSort() {
    const infoDiv = document.querySelector('.algo-info');
    let html = `<h1>Selection Sort Visualizer</h1>`;
    html += `<h2>Time Complexity: O(n^2)</h2>`;
    html += `<h3>Space Complexity: O(1)</h3>`;
    html += `<p class="algo-text">This sorting algorithm builds a sorted subarray from
                                left to right, leaving the unsorted subarray on the right
                                side of the sorted subarray. It selects the new smallest
                                (or largest depending on your sort criteria) and pushes
                                 it onto the end of the sorted subarray on each iteration.
                                 This algorithm utilizes a simple swap and does not allocate
                                 additional memory to perform the sort. It is a nest loop,
                                 and therefore has a worst-case time complexity of 
                                 O(n^2), although it will run faster on average cases in
                                 practice.</p>`;
    infoDiv.innerHTML = html;
}


/************* MERGE SORT ****************/
/* Merge Sort does not sort in place, and thus we have to be
*  clever when implementing it and also editing the css style
*  of our divs to show the visualization of how the algorithm
*  works. My method is to store a copy of the divs, that way
*  I can use one to be sorted by merge sort, and the other to
*  change the css style property to show the visualization.
*  Unlike other sorts, we are not swapping
*  elements when sorting, instead we are merging entire
*  arrays together as the name implies.  */

// NOT CURRENTLY WORKING VISUALLY, DOES WORK IN BACKGROUND
/*
async function mergeSort(divCollection) {
    if(divCollection.length < 2) return divCollection;
    let middleIndex = Math.floor(divCollection.length / 2);
    let left = divCollection.slice(0, middleIndex);
    let right = divCollection.slice(middleIndex);
    await merge(mergeSort(left), mergeSort(right));
}


async function merge(left, right) {
    let mergedCollection = [];
    console.log(left);
    while(left.length && right.length) {
        if(parseInt(left[0].style.maxWidth) < parseInt(right[0].style.maxWidth || right.length === 0)) {
            let el = left.shift();
            mergedCollection.push(el);
        } else {
            let el = right.shift();
            mergedCollection.push(el);
        }
    }
    let res = mergedCollection.concat(left.slice().concat(right.slice()));
    let divs = storeSortingDivs();
    let j = 0;
    for(let i = divs.indexOf(left[0]); i < mergedCollection.length; i++) {
        await sleep();
        divs[i].style.maxWidth = res[j].style.maxWidth;
        j++
    }

    return res;
}

function displayMergeSortInfo() {
    const infoDiv = document.querySelector('.algo-info');
    let html = `<h1>Merge Sort Visualizer</h1>`;
    html += `<h2>Time Complexity: O(n log n)</h2>`;
    html += `<h3>Space Complexity: O(n)</h3>`;
    html += `<p class="algo-text"></p>`;
    infoDiv.innerHTML = html;
}
*/









