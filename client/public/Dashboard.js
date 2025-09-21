// import { func } from 'joi';
import { loginUser, getUsers, registerUser } from  './src/services/userService.js';
function renderUsers(users) {
    const tableBody = document.querySelector("#tableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    users.forEach(user => {
        const { name, email, account_number, routing_number } = user;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">${name}</td>
            <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">${email}</td>
            <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">${account_number}</td>
            <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">${routing_number}</td>
            <td class="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function updateUsers() {
    try {
        const users = await getUsers();
        renderUsers(users);
    } catch (err) {
        console.error("Failed to fetch users:", err.message);
    }
}

// Initial render
document.addEventListener("DOMContentLoaded", updateUsers);

// Example: Rerender every 5 seconds (polling)
setInterval(updateUsers, 5000);

// Or call updateUsers() after any action like adding/deleting/editing a user