// Function to encode a string to Base64
const base64Encode = (string) => {
    return btoa(string); // btoa() function encodes to Base64
};

// Function to decode a Base64 encoded string
const base64Decode = (encodedString) => {
    return atob(encodedString); // atob() function decodes from Base64
};

// Save user (Signup)
const saveUser = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!firstname || !lastname || !username || !email || !password) {
        alert('All fields are required.');
        return;
    };

    // Encode the password using Base64
    const encodedPassword = base64Encode(password);

    const userData = {
        firstname,
        lastname,
        username,
        email,
        password: encodedPassword
    };

    const url = "http://localhost:3000/users";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to save user');
        const data = await response.json();
        console.log(data);
        alert('User registered successfully');
        window.location.href = '/pages/login.html'; // Redirect to login page after signup
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Error registering user.');
    }
};

// Function to check if user is logged in
const isLoggedIn = () => {
    return localStorage.getItem('userId') !== null;
};

// Function to check if user is admin
const isAdmin = () => {
    const username = localStorage.getItem('username');
    return username === 'admin';
};

// Function to redirect to login page if not logged in
const redirectToLogin = () => {
    const publicPages = ['/pages/signup.html', '/pages/login.html'];
    const currentPage = window.location.pathname;

    // Redirect to login page if not logged in and trying to access restricted pages
    if (!isLoggedIn() && !publicPages.includes(currentPage)) {
        window.location.href = '/pages/login.html';
    }
};

// User-related functions
// Fetch all users
const fetchUsers = async () => {
    const url = "http://localhost:3000/users";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Update user details
const updateUser = async () => {
    const updateUser = {
        id: 1,
        firstname: "Eren",
        lastname: "Sen",
        username: "a",
        email: "erensen@gmail.com",
        password: base64Encode("a") // Encode the password before updating
    };

    const url = "http://localhost:3000/users";

    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updateUser),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to update user');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

// Delete user
const deleteUser = async () => {
    const userId = new URLSearchParams(window.location.search).get("id");
    if (!userId) {
        console.error('User ID not found in URL');
        return;
    }
    const url = `http://localhost:3000/users/${userId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to delete user');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Post-related functions
// Save post
const savePost = async (event) => {
    event.preventDefault();
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const image = document.getElementById('post-image').value.trim();
    const userId = localStorage.getItem('userId');

    if (!title || !content || !image) {
        alert('All fields are required.');
        return;
    }

    const postData = {
        title,
        content,
        image,
        userId
    };

    const url = "http://localhost:3000/posts";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to save post');
        const data = await response.json();
        console.log(data);
        alert('Post created successfully');
        window.location.href = '/index.html'; // Redirect to home page after post creation
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Error creating post.');
    }
};

// Fetch all posts
const fetchPosts = async () => {
    const url = "http://localhost:3000/posts";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

// Update post details
const updatePost = async () => {
    const updatePost = {
        id: 1,
        title: "First Post",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "path_to_image",
        userId: localStorage.getItem('userId')
    };

    const url = "http://localhost:3000/posts";

    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updatePost),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to update post');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

// Delete post
const deletePost = async () => {
    const postId = new URLSearchParams(window.location.search).get("id");
    if (!postId) {
        console.error('Post ID not found in URL');
        return;
    }
    const url = `http://localhost:3000/posts/${postId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error('Failed to delete post');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

// Handle login
const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const encodedPassword = base64Encode(password);

    try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) throw new Error('Failed to fetch user data');
        const users = await response.json();

        const user = users.find(user => user.username === username && user.password === encodedPassword);
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Store user ID and username in local storage
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        // Redirect based on user role
        if (user.role === 'admin') {
            window.location.href = "/index.html"; // Redirect to the admin page
        } else {
            window.location.href = "/index.html"; // Redirect to the regular user page
        }
    } catch (error) {
        alert(error.message);
    }
};

// Add event listeners and handle DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signup');
    if (signupForm) {
        signupForm.addEventListener('submit', saveUser);
    }

    const createPostForm = document.getElementById('create-post');
    if (createPostForm) {
        createPostForm.addEventListener('submit', savePost);
    }

    // Check for admin and display edit/delete buttons if on post page
    const postId = new URLSearchParams(window.location.search).get('id');
    if (postId && isAdmin()) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = `/pages/editpost.html?id=${postId}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            await deletePost(postId);
            window.location.href = '/index.html';
        });

        const postActions = document.getElementById('post-actions');
        if (postActions) {
            postActions.appendChild(editButton);
            postActions.appendChild(deleteButton);
        }
    }

    // Fetch and display posts
    fetchAndDisplayPosts();

    // Handle menu bar
    const menuBar = document.getElementById('menu');
    if (menuBar) {
        // Logout Button
        const logoutButton = document.createElement('li');
        logoutButton.innerHTML = '<a href="#" id="logout">Logout</a>';
        menuBar.querySelector('.links').appendChild(logoutButton);

        const logout = document.getElementById('logout');
        logout.addEventListener('click', () => {
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            window.location.href = '/pages/login.html';
        });

        // Create Post Button for Admins
        if (isAdmin()) {
            const createPostButton = document.createElement('li');
            createPostButton.innerHTML = '<a href="/pages/createpost.html" id="create-post">Create Post</a>';
            menuBar.querySelector('.links').appendChild(createPostButton);
        }
    }
});

// Function to fetch and display posts
const fetchAndDisplayPosts = async () => {
    try {
        if (!isLoggedIn()) {
            // Redirect to login page if not logged in
            redirectToLogin();
            return;
        }

        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error('Failed to fetch posts data');
        const posts = await response.json();

        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        posts.forEach((post, index) => {
            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = post.title;

            const postClass = index % 2 === 0 ? 'wrapper spotlight style1' : 'wrapper alt spotlight style2';

            const postContainer = document.createElement('section');
            postContainer.id = `post-${index + 1}`;
            postContainer.className = postClass;

            const learnMoreLink = document.createElement('a');
            learnMoreLink.href = `/pages/postpage.html?id=${post.id}`;
            learnMoreLink.className = 'special';
            learnMoreLink.textContent = 'Learn more';

            postContainer.innerHTML = `
                <div class="inner">
                    <a href="/pages/postpage.html?id=${post.id}" class="image"><img src="${post.image}" alt="" /></a>
                    <div class="content">
                        ${postTitle.outerHTML}
                        ${postContent.outerHTML}
                        ${learnMoreLink.outerHTML}
                    </div>
                </div>`;

            postsContainer.appendChild(postContainer);
        });
    } catch (error) {
        console.error('Error fetching and displaying posts:', error);
    }
};
