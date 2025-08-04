sap.ui.jsview("ui.ui.view.XOXO", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.XOXO
	 */
	getControllerName: function() {
		return "ui.ui.controller.XOXO";
	},
	/** display basic layout of the app's landing screen.
	 * In case detail page returns null it will open wizard to create basic landscape.
	 * @memberOf controller.XOXO
	 */
	getMasterPage: function(oController) {
		if (!this.oMasterPage) {
			this.oMasterPage = new sap.m.Page("master", {
				width: "auto",
				showHeader: true,
				title: "Operative Locations(5)",
				footer:new sap.m.Bar("masterFooter", {})
			});

		
			var oContent = new sap.tnt.NavigationList("navigationList", {
				width: "auto"
			});
			this.oMasterPage.addContent(oContent);

		}
		return this.oMasterPage;
	},
	/** display basic layout of the app's landing screen.
	 * In case detail page returns null it will open wizard to create basic landscape.
	 * @memberOf controller.XOXO
	 */
	getDetailPage: function(oController) {
		if (!this.oDetailPage) {
			
			this.oDetailPage = new sap.m.Page("page", {
				showHeader:false,
				width: "90%",
				footer: new sap.m.Bar({
					contentRight: [new sap.m.Button("editLandscapeBtn", {
							text: "Edit",
							type: "Emphasized"
								
						}),
						new sap.m.Button("chatBtn",{icon: "sap-icon://discussion",tooltip:"Chat your PQA Bot",text:"Chat"}),
					]
				})
			});
			//addign content to the page
			var oContent = new sap.m.IconTabBar("pageIconTabBar", {
				upperCase: true,
				expandable: false,
				applyContentPadding: true,
				stretchContentHeight: true
			}).addStyleClass("sapUiResponsiveContentPadding");
			//creating tab bar
			oContent.addItem(new sap.m.IconTabFilter("iSolution", {	text: "My Service",height: "100%"}));
			oContent.addItem(new sap.m.IconTabFilter({text: "Mobility",height: "100%"}));
			oContent.addItem(new sap.m.IconTabFilter({text: "KYC",height: "100%"}));
			oContent.addItem(new sap.m.IconTabFilter({text: "Reports",height: "100%"}));
			this.oDetailPage.addContent(oContent);

		}
		return this.oDetailPage;
	},
	//creating left side panel
	createSidePanel1: function(){
		var sideNav= new sap.tnt.SideNavigation({expanded:false});
		var oContent2 = new sap.tnt.NavigationList({
				width: "5%"
				
			});
		//adding buttons to he bar
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://compare",tooltip:"Doctor Availbility Index"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://activities",tooltip:"Patient Activities"}));
		sideNav.setItem(oContent2);
		//adding fixed buttons
		var oContent3=new sap.tnt.NavigationList({
				width: "5%"
			}).addStyleClass("sapUiNoContentPadding");
		oContent3.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://video",tooltip:"Hospital promo video shoot"}));
		oContent3.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://attachment-video",tooltip:"Upload promo/treatment video"}));
		oContent3.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://record",tooltip:"Go live treatment"}));
		sideNav.setFixedItem(oContent3);
		sideNav.addStyleClass("sideListBody");
		return sideNav;
	},
	//creating right side pane
	createSidePanel2: function(){
		var that=this;
		var sideNav= new sap.tnt.SideNavigation({expanded:false});
		var oContent2 = new sap.tnt.NavigationList({
				width: "5%"
			});
		//adding buttons to the bar
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://search",tooltip:"Search Doctor"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://line-chart-time-axis",tooltip:"Critical patients"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://simple-payment",tooltip:"Critical Patients fee paid"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://time-overtime",tooltip:"Critical Patients fee unpaid"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://time-account",tooltip:"Patients nearing death stage"}));
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://time-entry-request",tooltip:"Enquiry request list",
			select: function(oEvent){
				that.oController.dispEnquiryList(oEvent);
			}
		})
		);
		sideNav.setItem(oContent2);
		oContent2 = new sap.tnt.NavigationList({
				width: "5%"
			});
		oContent2.addItem(new sap.tnt.NavigationListItem({icon: "sap-icon://discussion",tooltip:"Chat your PQA Bot"}));
		sideNav.setFixedItem(oContent2);
		sideNav.addStyleClass("sideListBody");
		return sideNav;
	},
	/** creating basic layout of the app's landing screen.
	 * In case detail page returns null it will open wizard to create basic landscape.
	 * @memberOf controller.XOXO
	 */
	createLayout: function(oController) {
		this.setHeight("100%");
		this.setDisplayBlock(true);
		this.oController=oController;
		//main page
		this.oPage=new sap.m.Page({width: "100%",showHeader: true,
				title: "e-Buy.com Sales Service "
			});
        this.oPage2=new sap.m.Page({showHeader:false});
	    //add split App to main page
		this.mainPage = new sap.m.SplitApp("splitApp");
		this.mainPage.addMasterPage(this.getMasterPage(oController));
		this.mainPage.addDetailPage(this.getDetailPage(oController));
	
	    //create split app to adjust left side panel
		var splitApp=new sap.m.SplitApp();
		splitApp.addMasterPage(this.createSidePanel1());
		splitApp.addDetailPage(this.mainPage);
		this.oPage2.addContent(splitApp); 
		
		//create split app to adjust right side panel
		splitApp=new sap.m.SplitApp();
		splitApp.addMasterPage(this.oPage2);
		splitApp.addDetailPage(this.createSidePanel2());
		this.oPage.addContent(splitApp); 
		
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.XOXO
	 */
	createContent: function(oController) {
		// this.createLayout();
		this.createLayout(oController);
		return this.oPage;
	}

});