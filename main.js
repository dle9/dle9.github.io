// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ USED TO TOGGLE BETWEEN TEXT, STYLES, AND IMAGES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// used to toggle between texts on about page
var ABOUT_INDEX = 0;

// used to toggle between certification images
var CERT_INDEX = 0;

// used to toggle between project text
var PROJECT_INDEX = 0;

// localStorage allows persistent data
// toggles between styles
var STYLE_INDEX = parseInt(localStorage.getItem('style_index')) ? parseInt(localStorage.getItem('style_index')) : 0;
// doesn't work for amazing rubric
// var STYLE_DATA = [
//     "styles1.css", 
//     "styles2.css"];

// main
document.addEventListener("DOMContentLoaded", function() {
    // the element that has the current-page class
    let curr_page_elem = document.querySelector('a.current-page');
    
    // gets all elements with passive class
    // i.e. pages that the user isn't on
    let passive_page_elems = document.getElementsByClassName('passive');
    
    // the actual page that the user is currently on
    // toggles style and makes the current page
    // header bold and colored. 
    actual_curr_page_name = window.location.href.split('/').pop().split('.').shift();
    let actual_curr_page_elem = null;
    // makes code more readable
    if (actual_curr_page_name == "index" || actual_curr_page_name == "") {
        actual_curr_page_name = "home";
    }
    
    // toggles current-page class to the 
    // current page that the user sees
    // this is for page content and style logic
    if (curr_page_elem.textContent.toLowerCase() != actual_curr_page_name) {
        // change the page with current-page class to passive
        curr_page_elem.classList.remove('current-page'); 
        curr_page_elem.classList.add('passive'); 
        
        // find the 'a' elem that corresponds to the actual curr page 

        for (let i = 0; i < passive_page_elems.length; i++) {
            if (passive_page_elems[i].textContent.toLowerCase() == actual_curr_page_name) {
                actual_curr_page_elem = passive_page_elems[i];
            }
        }

        // now we have the elem of actual curr page, 
        // change the element's class to current-page
        actual_curr_page_elem.classList.remove('passive');
        actual_curr_page_elem.classList.add('current-page');
    } // end of current-page class logic

    // next to name
    style_arrow_controller();

    // used in about, certifications, and project
    content_arrow_controller();

    // toggles between images, text
    // and color styles depending on 
    // which style is selected
    page_style_controller();

    // toggles between page content by using 
    // variables defined at the top
    page_content_controller();

    // handle the password prompt for arcade mode
    password_prompt_controller();    
});

// determine what goes on each page 
function page_content_controller() {
    // content arrows are only in these pages
    if (actual_curr_page_name == "about"
    || actual_curr_page_name == "certifications"
    || actual_curr_page_name == "projects") {
        left_content_arrow_elem.src = localStorage.getItem('content-arrow-src');
        right_content_arrow_elem.src = localStorage.getItem('content-arrow-src');
    }

    // toggles between start image sizes
    if (actual_curr_page_name == "home") {
        // get start elem and change the style based on hover or not
        start_elem = document.getElementById('start');

        start_elem.addEventListener('mouseenter', function() {
            start_elem.style.transform="scale(.9)";
        });
        start_elem.addEventListener('mouseleave', function() {
            start_elem.style.transform="scale(1)";
        });
        start_elem.addEventListener('click', function() {
            tell_password(actual_curr_page_name);
        }); // end of click on start logic
    } // end of home page content logic
    
    // toggles between bat image sizes
    else if (actual_curr_page_name == "about" && STYLE_INDEX%2==1) {
        // the number of texts to cycle through
        num_data = document.getElementsByClassName('about-content').length;

        // the base id for each text
        base_id = "about-text-";

        // determine id for text value at about_index
        if (ABOUT_INDEX < 0) {
            if (-1*ABOUT_INDEX%num_data == 0) {
                content_id = base_id + 1;
            } else {
                content_id = base_id + (num_data - (-1*ABOUT_INDEX%num_data) + 1);
            }
        } else {
            content_id = base_id + (ABOUT_INDEX % num_data + 1);
        }
        // show the current text at the index
        document.getElementById(content_id).style.display="block";

        // make the bat show up on last page only
        // click on bat !
        if (STYLE_INDEX%2!=0) {
            bat_elem = document.getElementById('bat');
            
            // bat_elem.style.visibility="visible";
            bat_elem.addEventListener('mouseenter', function() {
                bat_elem.style.transform="scale(.05)";
            });
            bat_elem.addEventListener('mouseleave', function() {
                bat_elem.style.transform="scale(.06)";
            });
            bat_elem.addEventListener('click', function() {
                tell_password(actual_curr_page_name);
            });
        }// end of bat image logic
    } // end of about pagecontent logic

    // resume only has a linked google document.

    // toggles between which certification is showing
    else if (actual_curr_page_name == "certifications"){
        // the number of texts to cycle through
        num_data = document.getElementsByClassName('cert-content').length;

        // the base id for each text
        base_id = "cert-";

        // determine id for text value at about_index
        if (CERT_INDEX < 0) {
            if (-1*CERT_INDEX%num_data == 0) {
                content_id = base_id + 1;
            } else {
                content_id = base_id + (num_data - (-1*CERT_INDEX%num_data) + 1);
            }
        } else {
            content_id = base_id + (CERT_INDEX % num_data + 1);
        }
        // show the current image at the index
        document.getElementById(content_id).style.display="block";
    } // end of certifications page content logic
    
    // toggles between which project is showing
    else if (actual_curr_page_name == "projects") {
        // the number of texts to cycle through
        num_data = document.getElementsByClassName('projects-content').length;

        // the base id for each text
        base_id = "projects-text-";

        // determine id for text value at about_index
        if (PROJECT_INDEX < 0) {
            if (-1*PROJECT_INDEX%num_data == 0) {
                content_id = base_id + 1;
            } else {
                content_id = base_id + (num_data - (-1*PROJECT_INDEX%num_data) + 1);
            }
        } else {
            content_id = base_id + (PROJECT_INDEX % num_data + 1);
        }
        // show the current text at the index
        document.getElementById(content_id).style.display="block";

        // click on cat to get alert for ctf
        person_elem.addEventListener('click', function() {
            tell_password(actual_curr_page_name);
        });
    } // end of projects page content logic
} // end of page_content_controller()

// toggle between styles
// for colors and images
function page_style_controller() {
    // the style arrows in top left
    left_style_arrow_elem.src = localStorage.getItem('style-arrow-src');
    right_style_arrow_elem.src = localStorage.getItem('style-arrow-src');

    // clicking on arrows changes css style
    style_elem = document.getElementById('style');
    
    // get the style from style_data[] given style_index
    base_id = "styles";
    if (STYLE_INDEX < 0) {
        if (-1*STYLE_INDEX%2 == 0) {
            style_path = base_id + 1 + ".css";
        } else {
            style_path = base_id + (2 - (-1*STYLE_INDEX%2) + 1) + ".css";
        }
    } else {
        style_path = base_id + (STYLE_INDEX % 2 + 1) + ".css";
    }
    
    // replace the style given the style index
    style_elem.href=style_path;

    // save the current style to local storage
    localStorage.setItem('style_index', STYLE_INDEX);

    // makes sure style arrows toggles along with 
    // style cahnge. used in all pages
    if (STYLE_INDEX%2 == 0) {
        localStorage.setItem('style-arrow-src', 'images/dark-style-arrow.png');
    } else {
        localStorage.setItem('style-arrow-src', 'images/light-style-arrow.png');
    }
    left_style_arrow_elem.src = localStorage.getItem('style-arrow-src');
    right_style_arrow_elem.src = localStorage.getItem('style-arrow-src');

    // makes sure content arrows toggles along with style change
    // content arrows are only used in about, certs, projs
    if (actual_curr_page_name == "about"
    || actual_curr_page_name == "certifications"
    || actual_curr_page_name == "projects") {
        if (STYLE_INDEX%2 == 0) {
            localStorage.setItem('content-arrow-src', 'images/dark-content-arrow.png');
        } else {
            localStorage.setItem('content-arrow-src', 'images/light-content-arrow.png');
        }
        left_content_arrow_elem.src = localStorage.getItem('content-arrow-src');
        right_content_arrow_elem.src = localStorage.getItem('content-arrow-src');
    } // end of content arrow style handler

    // makes sure cat image toggles with 
    // the style and is persiustent
    // cat is only in home, about, projects
    if (actual_curr_page_name == "home" 
    || actual_curr_page_name == "about"
    || actual_curr_page_name == "projects") {
        // the cat element
        person_elem = document.getElementById('person');
        // hover animation
        person_elem.addEventListener('mouseenter', function() {
            person_elem.style.transform="scale(.95)";
        });
        person_elem.addEventListener('mouseleave', function() {
            person_elem.style.transform="scale(1)";
        });

        // black cat
        if (STYLE_INDEX%2 == 0) {
            localStorage.setItem('cat_src', "images/black-cat.png");

            person_elem.addEventListener('click', function() {
                localStorage.setItem('cat_src', "images/happy-black-cat.png");
                person_elem.src = localStorage.getItem('cat_src');
            });
        }
        // white cat
        else {
            localStorage.setItem('cat_src', "images/white-cat.png");
            // used for generating specific alerts
            // used in dark style for password
            happy_cat = false;
            person_elem.addEventListener('click', function() {
                localStorage.setItem('cat_src', "images/happy-white-cat.png");
                person_elem.src = localStorage.getItem('cat_src');
                happy_cat = true;
            });
        }
        person_elem.src = localStorage.getItem('cat_src');
    } // end of cat style handler

    // resume button style toggle
    if (actual_curr_page_name == "resume") {
        resume_button_elem = document.getElementById('resume-button');
        if (STYLE_INDEX%2 == 0) {
            localStorage.setItem('resume_button_src', "images/dark-link-button.png"); 
        }
        else {
            localStorage.setItem('resume_button_src', "images/light-link-button.png");
        }
        resume_button_elem.src = localStorage.getItem('resume_button_src');
    } // end of resume link button style
} // end of page_style_controller()

// handles switching text content arrows 
// and arrow animations on arrows next to content
function content_arrow_controller() {
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ logic for arrow images
    // resume and home don't have arrows
    if (actual_curr_page_name == "about" 
    || actual_curr_page_name == "certifications" 
    || actual_curr_page_name == "projects") {

        // hover animations
        left_content_arrow_elem = document.getElementById('content-arrow-left');
        right_content_arrow_elem = document.getElementById('content-arrow-right');

        left_content_arrow_elem.addEventListener('mouseenter', function() {
            left_content_arrow_elem.style.transform="scale(.4)";
        });
        left_content_arrow_elem.addEventListener('mouseleave', function() {
            left_content_arrow_elem.style.transform="scale(.5)";
        });
        
        right_content_arrow_elem.addEventListener('mouseenter', function() {
            right_content_arrow_elem.style.transform="scaleX(-1) scale(.4)";
        });
        right_content_arrow_elem.addEventListener('mouseleave', function() {
            right_content_arrow_elem.style.transform="scaleX(-1) scale(.5)";
        });
        
        // iterate the indexes to determine content
        left_content_arrow_elem.addEventListener('click', function() {
            // hide the current text
            document.getElementById(content_id).style.display="none";
            if (actual_curr_page_name == "about") {
                ABOUT_INDEX--;
            } else if (actual_curr_page_name == "certifications") {
                CERT_INDEX--;
            } else if (actual_curr_page_name == "projects") {
                PROJECT_INDEX--;
            } 
            // update content and style
            page_content_controller();
            page_style_controller();
        });
        right_content_arrow_elem.addEventListener('click', function() {
            // hide the current text
            document.getElementById(content_id).style.display="none";
            if (actual_curr_page_name == "about") {
                // hide the current text
                ABOUT_INDEX++;
            } else if (actual_curr_page_name == "certifications") {
                CERT_INDEX++;
            } else if (actual_curr_page_name == "projects") {
                PROJECT_INDEX++;
            } 
            // update content and style
            page_content_controller();
            page_style_controller();
        });
    
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ logic for keyboard arrow keys
        // keybaord controls for pages with arrow pictures
        // shrink arrow image when arrow key down
        document.addEventListener('keydown', function(event) {
            if (event.key == 'ArrowLeft') {
                left_content_arrow_elem.style.transform="scale(.4)";
            }
            else if (event.key === 'ArrowRight') {
                right_content_arrow_elem.style.transform="scaleX(-1) scale(.4)";
            }
        });
        // return arrow to original size on key up 
        // and execute logic for corresponding page
        document.addEventListener('keyup', function(event) {
            if (event.key == 'ArrowLeft' 
            && !(actual_curr_page_name == "about" && STYLE_INDEX%2==0)
            && !(actual_curr_page_name == "certifications" && STYLE_INDEX%2==0)
            && !(actual_curr_page_name == "projects" && STYLE_INDEX%2==0)) {
                // hide the current text
                document.getElementById(content_id).style.display="none";
                left_content_arrow_elem.style.transform="scale(.5)";
                if (actual_curr_page_name == "about") {
                    ABOUT_INDEX--;
                } else if (actual_curr_page_name == "certifications") {
                    CERT_INDEX--;
                } else if (actual_curr_page_name == "projects") {
                    PROJECT_INDEX--;
                } 
            }
            else if (event.key == 'ArrowRight' 
            && !(actual_curr_page_name == "about" && STYLE_INDEX%2==0)
            && !(actual_curr_page_name == "certifications" && STYLE_INDEX%2==0)
            && !(actual_curr_page_name == "projects" && STYLE_INDEX%2==0)){
                // hide the current text
                document.getElementById(content_id).style.display="none";
                right_content_arrow_elem.style.transform="scaleX(-1) scale(.5)";
                if (actual_curr_page_name == 'about') {
                    ABOUT_INDEX++;
                } else if (actual_curr_page_name == "certifications") {
                    CERT_INDEX++;
                } else if (actual_curr_page_name == "projects") {
                    PROJECT_INDEX++;
                } 
            }
            // update content and style
            page_content_controller();
            page_style_controller();
        }); 
    }
} // end of content_arrow_controller() 

// handles switching styles and arrow animations 
// when clicking on the arrows next to name 
function style_arrow_controller() {
    // get the elements next to name in top left
    left_style_arrow_elem = document.getElementById('style-arrow-left');
    right_style_arrow_elem = document.getElementById('style-arrow-right');

    // toggle the arrow sizes
    left_style_arrow_elem.addEventListener('mouseenter', function() {
        left_style_arrow_elem.style.transform="scaleX(-1) scale(.4)";
    });
    left_style_arrow_elem.addEventListener('mouseleave', function() {
        left_style_arrow_elem.style.transform="scaleX(-1) scale(.5)";
    });
    
    right_style_arrow_elem.addEventListener('mouseenter', function() {
        right_style_arrow_elem.style.transform="scale(.4)";
    });
    right_style_arrow_elem.addEventListener('mouseleave', function() {
        right_style_arrow_elem.style.transform="scale(.5)";
    });

    // iterate the style_index
    left_style_arrow_elem.addEventListener('click', function() {
        STYLE_INDEX--;
        // update content and style
        page_content_controller();
        page_style_controller();
    });
    right_style_arrow_elem.addEventListener('click', function() {
        STYLE_INDEX++;
        // update content and style
        page_content_controller();
        page_style_controller();
    });
}// end of style_arrow_controller()

// toggle the page by modifying www.xxxx.xxx/xxxx.html
function toggle_page(dest) {
    // switch the page 
    let url_path = window.location.href.split('/');
    url_path[url_path.length - 1] = dest+".html";
    window.location.href = url_path.join('/');
} // end of toggle_page(dest)

function password_prompt_controller() {
    // id="password-prompt" class="index-password-prompt"
    // only in arcade mode
    if (STYLE_INDEX%2 == 1) {
        password_prompt_elem = document.getElementById('password-prompt');
        password_prompt_elem.addEventListener('click', function() {
            let password = window.prompt("Enter password: ");
            if (actual_curr_page_name == "home") {
                if (password.toLowerCase() == "csce315") {
                    toggle_page("about");
                } else {
                    window.confirm("Incorrect. Hint: Begin the game!");
                }
            }
            else if (actual_curr_page_name == "about") {
                if (password.toLowerCase() == "hints") {
                    toggle_page("resume");
                } else {
                    window.confirm("Incorrect. Hint: Only winners (first place) can continue.");
                }
            }
            else if (actual_curr_page_name == "resume") {
                if (password.toLowerCase() == "snow") {
                    toggle_page("certifications");
                } else {
                    window.confirm("Incorrect. Hint: Don't forget to delete revealing comments in your source code.");
                }
            }
            else if (actual_curr_page_name == "certifications") {
                if (password.toLowerCase() == "reveille") {
                    toggle_page("projects");
                } else {
                    window.confirm("Incorrect. Hint: All images should have an alternative name.");
                }
            }
            else if (actual_curr_page_name == "projects") {
                if (password.toLowerCase() == "ilovecats") {
                    toggle_page("chatgpt");
                } else {
                    if (!happy_cat) {
                        window.confirm("Incorrect. Hint: Did you pet the cat?");
                    } else {
                        window.confirm("Incorrect. Hint: The password is 3 words, no spaces.")
                    }
                }
            }
        });
    }
}// end of password prompt controller

// called in page_content_controller()
// handle password alert 
// used for hints or telling passwords
function tell_password() {
    let arcade_mode = true;
    if (STYLE_INDEX%2 != 0) {
        arcade_mode = false;
    }
    // the user has clicked on the sword. 
    // alert them of password
    if (actual_curr_page_name == "home") {
        if (arcade_mode) {
            window.confirm("This interaction is for Arcade mode!");
        } else {
            window.confirm("The password is 'csce315'");
        }
    }

    // the user has clicked on the bat in last page of about
    else if (actual_curr_page_name == "about") {
        if (arcade_mode) {
            window.confirm("This interaction is for Arcade mode!");
        } else {
            window.confirm("Hint: Sometimes you have to fail succeed.");
        }
    }

    // resume has the password in
    // html comment

    // certifications has the password
    // in the form of a riddle in 
    // img src 

    else if (actual_curr_page_name == "projects") {
        // binary-to-text -> series of digits, digits-to-alphabet -> i love cats
        if (arcade_mode) {
            window.confirm("This interaction is for Arcade mode!");
        } else {
            window.confirm("00111001 00100000 00110001 00110010 00100000 00110001 00110101 00100000 00110010 00110010 00100000 00110101 00100000 00110011 00100000 00110001 00100000 00110010 00110000 00100000 00110001 00111001");
        }
    }
} // end of tell_password()
