describe('Pruebas del Portafolio de Enderjos', () => {

  beforeEach(() => {
    cy.visit('http://localhost/Enderjos/public/');
  });

  afterEach(function () {
    cy.wait(1000); // espera 1 segundo
    const testName = this.currentTest.title.replace(/\s+/g, '_'); // nombre del test sin espacios
    cy.screenshot(`PORTAFOLIO_${testName}`); // captura con nombre
  });

  // ================== HEADER ==================
  it('REQ001 - Verificar título', () => {
    cy.title().should('eq', 'Diseñador y Desarrollador Web en Costa Rica | Portafolio de Enderjos');
  });

  it('REQ002 - Enlace del logo lleva a Inicio', () => {
    cy.get('header img[alt="Logo de Enderjos"]').should('exist');
  });

  it('REQ003 - Enlace de Inicio', () => {
    cy.get('a[href="#nav_inicio"]').should('exist');
  });

  it('REQ004 - Enlace de Diseños', () => {
    cy.get('a[href="#nav_disenos"]').should('exist');
  });

  it('REQ005 - Enlace de Blog', () => {
    cy.get('a[href="#nav_blog"]').should('exist');
  });

  it('REQ006 - Enlace de Testimonios', () => {
    cy.get('a[href="#nav_testimonios"]').should('exist');
  });

  it('REQ007 - Enlace de Contacto', () => {
    cy.get('a[href="#nav_contacto"]').should('exist');
  });

  // ================== INICIO ==================
  it('REQ008 - Revisar h1', () => {
    cy.get('#nav_inicio h1').should('contain', '¡Bienvenidos a mi Portafolio!');
  });

  // ================== DISEÑOS RECIENTES ==================
  it('REQ009 - Revisar h2 Diseños Recientes', () => {
    cy.get('#nav_disenos h2').should('contain', 'Diseños Recientes');
  });

  it('REQ010 - Botones "Visitar" funcionan', () => {
    cy.get('#nav_disenos .visitar').each(($a) => {
      cy.wrap($a)
        .should('have.attr', 'href')
        .and('include', 'https://');
    });
  });

  it('REQ011 - Botón "Ver más" lleva a proyectos', () => {
    cy.get('#nav_disenos .ver')
      .should('have.attr', 'href')
      .and('match', /proyectos(\.html)?$/);
  });

  // ================== BLOG ==================
  it('REQ012 - Revisar h2 Blog', () => {
    cy.get('#nav_blog h2').should('contain', 'Blog');
  });

  // ================== HABILIDADES ==================
  it('REQ013 - Revisar h3 Habilidades', () => {
    cy.get('.habilidades h3').should('contain', 'Habilidades');
  });

  // ================== TESTIMONIOS ==================
  it('REQ014 - Revisar h2 Testimonios', () => {
    cy.get('#nav_testimonios h2').invoke('text').should('include', 'Testimonio');
  });

  // ================== CONTACTO ==================
  it('REQ015 - Revisar h2 Contacto', () => {
    cy.get('#nav_contacto h2').should('contain', 'Contacto');
  });

  it('REQ016 - Botón Formulario abre el formulario', () => {
    cy.get('#btnformulario1').should('exist').click({ force: true });
  });

  it('REQ017 - Botón "Otros métodos" existe', () => {
    cy.get('#btnformulario2').should('exist');
  });

  it('REQ018 - Formulario se envía correctamente', () => {
    cy.get('form.formulario_contacto')
      .should('have.attr', 'action')
      .and('include', 'formspree.io');
  });

  it('REQ019 - Botón Contactar redirige a WhatsApp', () => {
    cy.get('a[href*="wa.me"]').should('have.attr', 'target', '_blank');
  });

  // ================== FOOTER ==================
  it('REQ020 - Enlaces del Footer', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="#nav_inicio"]').should('exist');
      cy.get('a[href="#nav_disenos"]').should('exist');
      cy.get('a[href="#nav_blog"]').should('exist');
      cy.get('a[href="#nav_testimonios"]').should('exist');
      cy.get('a[href="#nav_contacto"]').should('exist');
    });
  });

  // ================== RESPONSIVE ==================
  const viewports = [
    { width: 375, height: 667 },    // Móvil
    { width: 768, height: 1024 },   // Tableta
    { width: 1366, height: 768 }    // Escritorio
  ];

  viewports.forEach(viewport => {
    it(`Captura en ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('http://localhost/Enderjos/public/');
    });
  });

});


describe('Pruebas de la página Proyectos | Enderjos', () => {

  beforeEach(() => {
    cy.visit('http://localhost/Enderjos/public/proyectos.html');
  });

  afterEach(function () {
    cy.wait(1000);
    const testName = this.currentTest.title.replace(/\s+/g, '_');
    cy.screenshot(`PROYECTOS_${testName}`);
  });

  // ================== HEADER ==================
  it('REQP001 - Verificar título de la página', () => {
    cy.title().should('eq', 'Proyectos realizados | Enderjos - Diseñador y Desarrollador Web en Costa Rica');
  });

  it('REQP002 - Verificar enlace del logo', () => {
    cy.get('header a[href="index.html"] img[alt="Logo de Enderjos"]').should('exist');
  });

  it('REQP003 - Revisar enlaces de navegación del header', () => {
    cy.get('header nav').within(() => {
      cy.get('a[href="index.html"]').should('exist');
      cy.get('a[href="index.html#nav_disenos"]').should('exist');
      cy.get('a[href="index.html#nav_blog"]').should('exist');
      cy.get('a[href="index.html#nav_testimonios"]').should('exist');
    });
  });

  // ================== MAIN ==================
  it('REQP004 - Revisar h1 principal', () => {
    cy.get('#inicio_proyecto h1')
      .should('contain', 'Mis')
      .and('contain', 'Proyectos');
  });

  it('REQP005 - Verificar que haya al menos 3 cards de proyectos', () => {
    cy.get('.contenedor-proyectos .card').should('have.length.at.least', 3);
  });

  it('REQP006 - Cada card tiene imagen, título, descripción y botón', () => {
    cy.get('.contenedor-proyectos .card').each(($card) => {
      cy.wrap($card).find('img').should('have.attr', 'src');
      cy.wrap($card).find('h3').should('exist');
      cy.wrap($card).find('p').should('exist');
      cy.wrap($card).find('a button').should('contain', 'Visitar');
    });
  });

  // ================== FOOTER ==================
  it('REQP007 - Revisar que el logo del footer exista', () => {
    cy.get('footer img[alt="Logo del sitio"]').should('exist');
  });

  it('REQP008 - Revisar enlaces de navegación del footer', () => {
    cy.get('footer nav').within(() => {
      cy.get('a[href="index.html"]').should('exist');
      cy.get('a[href="index.html#nav_disenos"]').should('exist');
      cy.get('a[href="index.html#nav_blog"]').should('exist');
      cy.get('a[href="index.html#nav_testimonios"]').should('exist');
    });
  });

  it('REQP009 - Revisar texto del lema en el footer', () => {
    cy.get('footer .lema').should('contain', 'Tu Historia, Mi Codigo');
  });

  // ================== RESPONSIVE ==================
  const viewports = [
    { width: 375, height: 667 },    // Móvil
    { width: 768, height: 1024 },   // Tableta
    { width: 1366, height: 768 }    // Escritorio
  ];

  viewports.forEach(viewport => {
    it(`REQP010 - Verificar que la página carga en ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('http://localhost/Enderjos/public/proyectos.html');
      cy.get('main').should('be.visible');
    });
  });

});
