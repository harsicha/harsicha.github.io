window.onload = function () {
    const rightArrowHead = String.fromCodePoint(0x25B8);

    // Set YoE
    // date format - mm/dd/yyyy
    const curDate = new Date();
    const startDate = new Date('08/16/2021');
    const diffMillis = curDate - startDate;
    const exp = diffMillis / (1000 * 60 * 60 * 24 * 365);
    const expRounded = Math.round(exp);
    const addPlus = exp > expRounded;
    document.querySelector('#about-me').innerHTML = document.querySelector('#about-me').innerHTML.replace('{{yoe}}', expRounded + `${addPlus ? '+' : ''}`);

    // Render workex details
    const workexBar = document.querySelector('.main-section-workex-company-bar');
    const workexDetailsDiv = document.querySelector('.main-section-workex-details');

    workexDetailsJson.sort((x, y) => y.sequence - x.sequence).forEach((elem, index) => {
        const companyNode = createAndAppendNode('p', elem.company, workexBar, false, false, 'main-section-workex-company', `bar-n${index}`);
        createAndAppendNode('span', '', companyNode, false, true, 'main-section-workex-bar');

        // Details container
        const container = createAndAppendNode('div', '', workexDetailsDiv, index > 0, false, 'main-section-workex-details-box', `box-n${index}`);

        // Heading node
        const heading = createAndAppendNode('p', '', container, false, false, 'main-section-workex-details-box-heading');
        createAndAppendNode('span', `${elem.designation} `, heading, false, false, 'main-section-workex-details-desig');
        createAndAppendNode('span', `@ ${elem.company}`, heading, false, false, 'main-section-workex-details-company');

        // Period node
        createAndAppendNode('p', elem.period, container, false, false, 'main-section-workex-details-box-period');

        // Add description
        var ul = createAndAppendNode('ul', '', container, false, false);

        elem.description.forEach(desc => {
            createAndAppendNode('li', desc, ul, false, false, 'main-section-workex-details-box-desc');
        })
    });

    // Add event listener to company bar
    var boxes = document.querySelectorAll('.main-section-workex-company');

    boxes.forEach(box => box.addEventListener('click', e => {
        console.log(e.target.id);

        const idx = Number(e.target.id.split("-n")[1]);
        const boxes = document.querySelectorAll('.main-section-workex-details-box');
        const slider = document.querySelector('.slider');

        console.log(`boxes length: ${boxes.length}, idx: ${idx}`);

        for (let i = 0; i < boxes.length; i++) {
            console.log(`i: ${i}, idx: ${idx}, i !== idx: ${i !== idx}`)
            console.log(boxes[i]);
            if (i !== idx) {
                boxes[i].setAttribute('style', 'display: none');
            }
            else {
                boxes[i].setAttribute('style', 'display: block');
                slider.setAttribute('style', `transform: translateY(${i * 50}px)`);
            }
        }
    }));

    // Render projects
    const projectsContainer = document.querySelector('.main-section-projects-container');

    projects.filter(p => !p.isHidden).splice(0, 3).forEach(project => {
        const articleNode = createAndAppendNode('article', '', projectsContainer, false, false, 'main-section-project-box');
        createAndAppendNode('h3', project.name, articleNode, false, false, 'main-section-project-name');

        const redirectIconNode = getRedirectIconNode(project.link);
        articleNode.appendChild(redirectIconNode);

        createAndAppendNode('p', project.description, articleNode, false, false, 'main-section-project-desc');
        createAndAppendNode('p', project.techStack, articleNode, false, false, 'main-section-project-tech-stack');

        articleNode.addEventListener('click', function () {
            window.open(project.link, '_blank').focus();
        });
    });
};

window.addEventListener('scroll', function () {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    console.log(`scrollTop: ${scrollTop}, clientHeight: ${clientHeight}, scrollHeight: ${scrollHeight}`);

    const bodyWidth = document.body.clientWidth;
    let scrollTopAbtMe = 200;
    let scrollTopWkx = 500;
    let scrollTopProj = 1000;

    if (bodyWidth < 450) {
        scrollTopAbtMe = 800;
        scrollTopWkx = 1500;
        scrollTopProj = 2300;
    } else if (bodyWidth < 550) {
        scrollTopAbtMe = 700;
        scrollTopWkx = 1300;
        scrollTopProj = 2200;
    } else if (bodyWidth < 760) {
        scrollTopAbtMe = 600;
        scrollTopWkx = 1100;
        scrollTopProj = 1900;
    } else if (bodyWidth < 1140) {
        scrollTopAbtMe = 500;
        scrollTopWkx = 900;
        scrollTopProj = 1700;
    }

    if (scrollTop >= scrollTopAbtMe) {
        this.document.querySelectorAll('.main-section-aboutme').forEach(elem => elem.setAttribute('style', 'animation: fadeIn 1.5s ease-out forwards;'));
    }
    if (scrollTop >= scrollTopWkx) {
        this.document.querySelectorAll('.main-section-workex-container').forEach(elem => elem.setAttribute('style', 'animation: fadeIn 1.5s ease-out forwards;'));
    }
    if (scrollTop >= scrollTopProj) {
        this.document.querySelectorAll('.main-section-projects').forEach(elem => elem.setAttribute('style', 'animation: fadeIn 1.5s ease-out forwards;'));
    }
});

function createAndAppendNode(element, text, parentNode, isDisplayNone, isFirst, classAttr, idAttr) {
    const node = document.createElement(element);
    if (classAttr && classAttr !== '') {
        node.classList.add(classAttr);
    }
    if (idAttr && idAttr !== '') {
        node.setAttribute('id', idAttr);
    }
    if (isDisplayNone) {
        node.setAttribute('style', 'display: none');
    }
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
    if (isFirst) {
        parentNode.insertBefore(node, parentNode.firstChild);
    }
    else {
        parentNode.appendChild(node);
    }
    return node;
}

function getRedirectIconNode(link) {
    const iconAnchor = document.createElement('a');
    iconAnchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>';
    iconAnchor.setAttribute('href', link);
    iconAnchor.setAttribute('target', '_blank');
    iconAnchor.classList.add('main-section-project-link');
    return iconAnchor;
}

const workexDetailsJson = [
    {
        "sequence": 1,
        "company": "Accenture",
        "period": "Aug 2021 - Jun 2024",
        "designation": "Software Engineer",
        "description": [
            "Write modern, maintainable code for web applications used by multiple users daily",
            "Build, maintain & optimize backend APIs using C#/.Net technologies",
            "Design & enhance databases created in SQL Server, PostgreSQL & MongoDB",
            "Collaborate with multi-disciplinary teams, UX designers, product managers & clients on regular basis"
        ]
    },
    {
        "sequence": 2,
        "company": "WebMD",
        "period": "Jun 2024 - Present",
        "designation": "Software Engineer",
        "description": [
            "Demonstrated ability to independently contribute while effectively collaborating within a team to achieve organizational goals",
            "Build, maintain & optimize backend APIs using C#/.Net technologies",
            "Create mobile-first, clean & responsive user interfaces using React & jQuery",
            "Collaborate with multi-disciplinary teams, UX designers, product managers & clients on regular basis"
        ]
    }
];

const projects = [
    {
        "sequence": 1,
        "isHidden": false,
        "name": "Rapid Redirect",
        "description": "Designed and implemented an efficient URL shortener API facilitating the conversion of lengthy URLs to concise, shareable links, ensuring seamless retrieval of original URLs via any search engine.",
        "techStack": "Spring Boot, Hibernate, PostgreSQL",
        "link": "https://github.com/harsicha/RapidRedirect-API"
    },
    {
        "sequence": 2,
        "isHidden": false,
        "name": "Chat Web Application",
        "description": "Designed and developed a full-stack chat web application with support for friend requests and real-time chatting capabilities with the help of WebSockets. Implemented JWT authentication for enhanced security and user authentication.",
        "techStack": "Express, React, MongoDB",
        "link": "https://github.com/harsicha/VConnect"
    },
    {
        "sequence": 3,
        "isHidden": false,
        "name": "Price Magnet",
        "description": "Engineered a web application that seamlessly aggregates and displays real-time results from both Flipkart and Amazon, enhancing user convenience and product comparison capabilities",
        "techStack": "ASP.Net Core, Selenium, React",
        "link": "https://github.com/harsicha/PriceMagnet"
    }
];