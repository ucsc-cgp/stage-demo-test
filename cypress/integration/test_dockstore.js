describe('Test Dockstore', function() {
    it('Request base URL, find and exercise search button', function() {
	// Test base URL.
	cy.request('GET', '/');
	cy.visit('/');
     	cy.get('#home-nav-button > img');
    	cy.get('.flex-toolbar > [href="/search"]')
	    .contains('Search').click();
	cy.get('#mat-expansion-panel-header-8')
	    .contains('Labels')
	    .should('be.visible');
	// Expand menu to show full contents and make sure it's visible.
	cy.get('#cdk-accordion-child-8 > .mat-expansion-panel-body > .panel-container-label.ng-star-inserted > .pull-right > .fa')
	    .should('be.visible')
	    .click();

	// Assert the new URL.
	cy.url().should('include', 'searchMode=files');
	cy.contains('topmed').click();

	var expected = 'doneDataBiosphere/topmed-workflows/UM_aligner_wdl';
	var found_workflow = false;

	// Assert workflow we're looking for exists.
	
	// Check whether any of the hits in the Browser Workflows match the workflow we're
	// looking for. Do so by traversing the DOM and narrowing down the scope.
	cy.get('body').within(() => {
	    cy.get('div.wrapper').within(() => {
		cy.get('div.container.search-container').within(() => {
		    cy.get('div.row').within(() => {
			cy.get('div.col-md-9.containers-rsb').within(() => {
			    cy.get('div.hits').within(() => {
				cy.get('div.tab-content').within(() => {
				    cy.get('tab#workflowTab.browseWorkflowsTab.active.tab-pane').within(() => {
					cy.get('div').within(() => {
					    cy
						.get('mat-table.mat-elevation-z4.mat-table')
						.find('>mat-row.mat-row.ng-star-inserted>')
						.filter('mat-cell.mat-cell.cdk-column-name.mat-column-name.ng-star-inserted')
					        .each(($el, index, $list) => {
						    if ($el.prop('textContent') === expected) {  // assert equality in type and value
							found_workflow = true;
							cy
							    .wrap($el).click()
							    .log('workflow is: ', $el.prop('textContent'));
							expect($el).to.have.text(expected);
						    }
						});
					});
				    });
				});
			    });
			});
		    });
		});
	    });
	});
	if(found_workflow);  // simple assertion that workflow has been found
	
	// Assert version of workflow.

	cy.get('body').within(() => {});
	var text_contains_version = " github.com/DataBiosphere/topmed-workflows/UM_aligner_wdl:1.32.0";
	
	cy.get('app-workflows.ng-star-inserted').within(() => {
	    cy
		.get('div.container')
	        .should('have.length', 2).within(() => {
		    cy.get('div.p-3').within(() => {
			cy.get('mat-card.mt-3.mat-card.ng-star-inserted').within(() => {
			    cy.get('mat-card-header.mat-card-header').within(() => {
				cy
				    .get('mat-card-subtitle.m-0.mat-card-subtitle')
				    .should(($p) => {
					expect($p)
					    .to.have.length(1)
					    .to.have.text('1.32.0');
				    });
			    });
			});
		    });
		}); 
	});
    });
});
