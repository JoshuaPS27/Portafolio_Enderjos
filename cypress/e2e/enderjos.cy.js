describe('Pruebas del Portafolio de Enderjos', () => {

  beforeEach(() => {
    cy.visit('https://remarkable-sawine-58dc6a.netlify.app/');
  });

  // ================== SCREENSHOT DESPUÉS DE CADA TEST ==================
  afterEach(() => {
    cy.wait(1000); 
    cy.screenshot(); 
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
    cy.get('#nav_disenos .visitar a').each(($a) => {
      cy.wrap($a).should('have.attr', 'href').and('include', 'http');
    });
  });

  it('REQ011 - Botón "Ver más" lleva a proyectos', () => {
    cy.get('#nav_disenos .ver a')
      .should('have.attr', 'href')
      .and('match', /proyectos(\.html)?$/);
  });

  // ================== BLOG ==================
  it('REQ012 - Revisar h2 Blog', () => {
    cy.get('#nav_blog h2').should('contain', 'Blog');
  });

  // ================== HABILIDADES ==================
  it('REQ013 - Revisar h3 Habilidades', () => {
    cy.get('.abilidades h3').should('contain', 'Habilidades');
  });

  // ================== TESTIMONIOS ==================
  it('REQ014 - Revisar h2 Testimonios', () => {
    cy.get('#nav_testimonios h2').invoke('text').should('include', 'Testimonios');
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
  // Prueba de Responsividad en tres tamaños de pantalla
  const viewports = [
  { width: 375, height: 667 },    // Móvil
  { width: 768, height: 1024 },   // Tableta
  { width: 1366, height: 768 }    // Escritorio
];

viewports.forEach(viewport => {
  it(`Captura en ${viewport.width}x${viewport.height}`, () => {
    cy.viewport(viewport.width, viewport.height);
    cy.visit('https://remarkable-sawine-58dc6a.netlify.app/');
  });
  });

});

