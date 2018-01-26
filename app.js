const form = document.querySelector('form');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');
const mainDiv = document.querySelector('.main');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');

filterCheckbox.type = 'checkbox';
filterLabel.textContent = 'Hide those who haven\'t responded';

div.appendChild(filterLabel);
div.appendChild(filterCheckbox);

mainDiv.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const list = ul.children;

    if (isChecked) {
        for (let i = 0; i < list.length; i++) {
            const li = list[i];
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < list.length; i++) {
            const li = list[i];
            li.style.display = '';
        }
    }
});

function createLi(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const label = document.createElement('label');
    label.textContent = 'Confirmed';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(label);
    label.appendChild(checkbox);
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    li.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    li.appendChild(removeBtn);
    
    return li;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLi(text);
    ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = e.target.parentNode;
        const ul = li.parentNode;

        if (button.textContent === 'remove') {
            ul.removeChild(li);
        } else if (button.textContent === 'edit') {
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'save';
        } else if (button.textContent === 'save') {
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;

            li.insertBefore(span, input);
            li.removeChild(input);

            button.textContent = 'edit';
        }
    }
});