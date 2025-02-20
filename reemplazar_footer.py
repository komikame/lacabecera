/* --------------------------------------------------------------------------------------MENU FIJO PARA PC ----------------------------------------------------------------------*/
.menu {
display: flex;
justify-content: center;
transition: height 0.3s ease-in-out;
justify-content: flex-end;
align-items: center;
flex-wrap: wrap;
list-style: none;
margin: 0;
padding: 0;
font-family: 'Roboto', sans-serif;
font-size: 0.8rem;

}




.menu li {
margin: 0 30px;
color: #000000;

}

.menu li a {
color: rgb(0, 0, 0);
text-decoration: none;
}

.menu li a:hover {
text-decoration: underline;
color: #4d0ee0b7;
}

.menu-container {
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
box-sizing: border-box;
overflow: hidden;
}


.logo {
transition: transform 0.3s ease-in-out;
}

.logo.shrink {
transform: scale(0.7); /* Reduce el tamaño del logo */
}
.instagram-link {
font-size: 18px;
color: white;
text-decoration: none;
}

.instagram-link:hover {
text-decoration: underline;
}

/*------------------------------------------------------------------------------SUBMENU INTERIOR PAGINAS CARGA DINAMICA----------------------------------------------------------------------- */
.submenu .submenu-list {
display: none;
position: absolute;
background: #ffffff;
padding: 10px 0;
margin: 0;
list-style: none;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
z-index: 1000;
}

.submenu:hover .submenu-list {
display: block;
}

.submenu .submenu-list li {
padding: 5px 20px;
}

.submenu .submenu-list li a {
color: #000000;
text-decoration: none;
display: block;
}

.submenu .submenu-list li a:hover {
background: #f4f4f4;
color: #770C0C;
}

/* --------------------------------------------------------------------------------------FIN DEL SUBMENU---------------------------------------------------------------------*/
.no-link {
pointer-events: none;
cursor: default;
}

.menu-toggle {
display: none;
background: none;
border: none;
font-size: 24px;
cursor: pointer;
color: #000;
}

/*-------------------FIN DEL MENU PARA PC------------------------------------------- */
