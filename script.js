'use strict'

const addBtn = document.querySelector( '#add_btn' );
const newTaskInput = document.querySelector( '#wrapper input' );
const taskContainer = document.querySelector( '#tasks' );
const error = document.getElementById( 'error' );
const countValue = document.querySelector( '.count_value' );
let taskCount = 0;

function displayCount ( taskCount )
{ 
   countValue.innerText = taskCount;
};

function addTask ()
{ 
   const taskName = newTaskInput.value.trim();
   error.style.display = 'none';
   if ( !taskName )
   {  
      setTimeout( () =>
      {
         error.style.display = 'block';
      }, 200 );
      return;
   }
   
   const task = `<div class="task">
      <input type="checkbox" class="task_check">
      <span class="taskName">${taskName}</span>
      <button class="edit"><i class="fa-solid fa-pen-fancy"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
   </div>`;

   taskContainer.insertAdjacentHTML( 'beforeend', task );

   const deleteBtn = document.querySelectorAll( '.delete' );
   deleteBtn.forEach( ( button ) =>
   { 
      button.onclick = () =>
      {
         button.parentNode.remove();
         taskCount -= 1;
         displayCount( taskCount );
      }
   } );
   const editBtns = document.querySelectorAll( '.edit' );
   editBtns.forEach( ( editBtn ) =>
   {
      editBtn.onclick = ( e ) =>
      {
         let targetEl = e.target;
         if ( !( e.target.className == 'edit' ) )
         {
            targetEl = e.parentElement;
         }
         newTaskInput.value = targetEl.previousElementSibling.innerText;
         targetEl.parentNode.remove();
         targetEl -= 1;
         displayCount( taskCount );
      }
   } )
   
   const tasksCheck = document.querySelectorAll( '.task_check' );
   tasksCheck.forEach( ( checkBox ) =>
   {
      checkBox.onchange = () =>
      {
         checkBox.nextElementSibling.classList.toggle( 'completed' );
         if ( checkBox.checked )
         {
            taskCount -= 1;
         } else {
            taskCount += 1;
         }
         displayCount( taskCount );
      }
   } )
   taskCount += 1;
   displayCount( taskCount );
   newTaskInput.value = '';
};

addBtn.addEventListener( 'click', addTask );

window.onload = () =>
{ 
   taskCount = 0;
   displayCount( taskCount );
   newTaskInput.value = '';
};