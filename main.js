// all variable 
// select the input feild
let input = document.querySelector( "input" );
// add task button 
let add = document.querySelector( ".plus" )
// task hover 
let task_hover = document.querySelector( ".container .text" )
// tasks container 
let taskContainer = document.querySelector( ".tasks" )
// no task message 
let noTask = document.querySelector( ".tasks .notask" );
// delete button 
let deleteButton = document.querySelectorAll( ".delete" )
// count
let count = document.querySelector( ".tasks-count span" )
//complete 
let complete = document.querySelector( ".tasks-complete span" )
// more Button 
let moreButton = document.querySelector( ".more" )
// my Button del all and finish all
let delall = document.querySelectorAll( ".button-a" )[ 0 ]
let finishall = document.querySelectorAll( ".button-a" )[ 1 ]

// my array to Add to localStorage and give tasks id
let array_of_tasks = []

// check if local storge EXIST
if ( localStorage.getItem( "tasks_ls" ) )
{
    array_of_tasks = JSON.parse( localStorage.getItem( "tasks_ls" ) )
}

// Trigger localStorage function
getdatafromlocalstorage()

//-------------------------------------------------------
let input_value = "";
// auto focus in input feild
window.onload = ( () => input.focus() )

// hover for show massege add task
add.addEventListener( "mouseenter", () =>
{
    task_hover.style.display = "block"
} )
add.addEventListener( "mouseleave", () =>
{
    task_hover.style.display = "none"
} )

// hover in more to show more option 

moreButton.addEventListener( "click", () =>
{
    finishall.classList.toggle( "hideen-appear" )
    delall.classList.toggle( "hideen-appear" )
} )


// add text to my tasks
add.onclick = toaddtext;

input.addEventListener( "keypress", ( e ) =>
{
    if ( e.key === "Enter" )
    {
        toaddtext()
    }
    console.log( e.key )
} )

// input.addEventListener( "keydown", ( e ) => console.log( e.key ) )

function toaddtext ()
{
    if ( input.value === null || input.value === "" || (input.value).trim() === "")
    {
        false
    } else
    {
        // Add value to my Variable
        // input_value = input.value ..................

        // check if text exist Before
        // this loop to add the list tasks "childern" into array 
        // to check it letter if it repeated
        let a = ( taskContainer.children )
        let b = [];

        for ( i = 0; i < a.length; i++ ) { b.push( a[ i ].textContent.slice( 0, -6 ).toLowerCase() ) }

        // this is check repeated ---!!-- and adding tasks
        if ( b.includes( input.value.trim().toLowerCase() ) )
        {
            console.log( " Your Task has already exist" )

        }
        //start adding tasks
        else
        {
            // Remove no tasks massege 
            noTask.remove();

            // function to add tasks to array and to page 
            addtasktoarray( input.value )

        }
    }
}



function addtasktoarray ( task_text )
{
    const tasks_obj = {
        id: Date.now(),
        title: task_text,
        completed: false,
    }
    // push task to Array of Tasks
    array_of_tasks.push( tasks_obj )

    // add my array of tasks Element to Page 
    addElemnttopageFrom( array_of_tasks )

    // add Tasks to LocalStorage 
    addtasks_toLocalstorage( array_of_tasks )

}


function addElemnttopageFrom ( array_of_tasks )
{

    // cleare the taskscontainer in body to add the Element
    taskContainer.innerHTML = ""

    // loop in array_of_tasks 
    array_of_tasks.forEach( ( task ) =>
    {

        // Create new span to delete and task
        let sp = document.createElement( "span" )
        sp.setAttribute( "class", "item" )
        sp.setAttribute( "data-id", task.id )
        let delsp = document.createElement( "span" )
        delsp.setAttribute( "class", "delete" )
        let textdel = document.createTextNode( "Delete" )
        let text = document.createTextNode( task.title );
        if ( task.completed == true )
        {
            sp.classList.add( "finish" )
        }

        // Add text to my container and delButton 
        sp.appendChild( text )
        delsp.appendChild( textdel )
        sp.appendChild( delsp )
        taskContainer.appendChild( sp )
        input.value = "";

        // Add count number to my count 
        set_count()

        // focus again on field 
        input.focus()
    } )
}



// Delete All tasks
delall.onclick = ( () =>
{
    taskContainer.innerHTML = "";
    array_of_tasks = [];
    // to set count 
    set_count()

    // to show massaege no tasks
    noTask_massage()

    // clear local Storage 
    localStorage.clear()
} )

// finishall tasks 
finishall.onclick = ( () =>
{
    document.querySelectorAll( ".container .tasks .item" )
        .forEach( e => e.classList.add( "finish" ) );
    console.log( array_of_tasks )
    array_of_tasks.forEach( ( task ) => task.completed = true )
    addtasks_toLocalstorage( array_of_tasks )
    // to set count
    set_count()
} )

// Delee Tasks

document.addEventListener( "click", ( e ) =>
{
    // Delete Task from list
    if ( e.target.className === "delete" )
    {
        // delet task from local storage 
        let del_item = e.target.parentElement.getAttribute( "data-id" );
        del_lcoal_item( del_item )

        // delete task 
        e.target.parentElement.remove()
        // to count the number of tasks 
        set_count()

        // to show no task to show massage 
        noTask_massage()
    }
}
)

/// to Delete from local Storage
function del_lcoal_item ( task_id )
{
    for ( i = 0; i < array_of_tasks.length; i++ )
    {
        console.log( `${ array_of_tasks[ i ].id } === ${ task_id }` )
    }
    array_of_tasks = array_of_tasks.filter( ( task ) => task.id != task_id );
    console.log( array_of_tasks )
    addtasks_toLocalstorage( array_of_tasks );
}

// Finish tasks 
document.addEventListener( "click", ( e ) =>
{
    // finish  Task from list
    if ( e.target.classList.contains( "item" ) )
    {
        // toggle complete in localstorage
        toggle_stats_finish( e.target.dataset.id )
        // console.log( e.target.dataset.id )
        e.target.classList.toggle( "finish" )
        set_count()
    }
} )

function toggle_stats_finish ( task_id )
{
    console.log( task_id )
    for ( i = 0; i < array_of_tasks.length; i++ )
    {
        if ( array_of_tasks[ i ].id == task_id )
        {
            array_of_tasks[ i ].completed == false ?
                ( array_of_tasks[ i ].completed = true ) :
                ( array_of_tasks[ i ].completed = false );
        }
    };
    addtasks_toLocalstorage( array_of_tasks )
}

// to set cout and complete number
function set_count ()
{
    count.innerHTML = taskContainer.children.length;
    complete.innerHTML = document.querySelectorAll( ".container .tasks .finish" ).length

}


// to show massage no task here
function noTask_massage ()
{

    if ( taskContainer.childElementCount === 0 )
    {
        let span_notask = document.createElement( "span" )
        let text = document.createTextNode( "NO tasks to show" )
        span_notask.appendChild( text )
        span_notask.setAttribute( "class", "notask" )

        taskContainer.appendChild( span_notask )
    }
}

// add my Tasks to localStorage 
function addtasks_toLocalstorage ( array )
{
    window.localStorage.setItem( "tasks_ls", JSON.stringify( array ) )
}

function getdatafromlocalstorage ()
{
    let data = window.localStorage.getItem( "tasks_ls" )
    if ( data )
    {
        let array_of_tasks = JSON.parse( data )
        addElemnttopageFrom( array_of_tasks )

    }
}
