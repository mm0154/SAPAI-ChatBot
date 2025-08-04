sap.ui.jsfragment("ui.ui.view.Enquiries", {

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf qa.view.LandscapeToBeOverview
	 */
	createContent: function (oController) {

		var downloadBtn = new sap.m.Button("HOMenuDownload", {
			icon: "sap-icon://download",
			type: "Emphasized",
			tooltip: "Download to Excel",
			press: function (oEvent) { //Event handling for the download button cl
				// sap.ui.controller("qa.view.LandscapeToBeHandover").downloadS2D(oEvent, "IDMANDATORYREPORTTABLEHO","HOCheckList");
			}
		});

		//Dialog box and controls for initiating new handover meeting
		var enTable = new sap.ui.table.TreeTable("enTable", {
			selectionMode: sap.ui.table.SelectionMode.MultiToggle,
			enableColumnReordering: true,
			collapseRecursive: false,
			visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
			minAutoRowCount: 10,
			rowHeight: 40,
			extension: [
				new sap.m.Bar({
					contentLeft: [new sap.m.Button("HOExpandCollapse", {
						icon: "sap-icon://expand",
						type: "Emphasized",
						tooltip: "Expand all",
						press: function (oEvent) {
							oController.expandCollapseMandatoryFields(oEvent, "enTable");
						}
					}), downloadBtn],
					//contentMiddle: [headingLabel],
					contentRight: [
						new sap.m.Button({
							text: "Clear Filters",
							tooltip: "Clear all filters",
							type: "Emphasized",
							press: function () {
								//mandatoryFieldsTable.setModel(sap.ui.getCore().getModel("HOCheckList"));
								//mandatoryFieldsTable.bindRows("/GetQAPTHOMandatoryFieldsCheck");
							}
						})
					]
				})
			],
			columns: [
				new sap.ui.table.Column({
					label: "Branch ID",
					template: "branchID",
					filterProperty: "branchID"
				}),
				new sap.ui.table.Column({
					label: "Branch Name",
					template: "branchName",
					filterProperty: "branchName"
				}),
				new sap.ui.table.Column("HOCheckTemplate", {
					label: "Enquiry Value",
					template: new sap.m.Link({
						text: {
							parts: ["TotalEnquiries"],
							formatter: function (data1) {
								if (data1 !== null) {
									this.removeStyleClass("addReportRedColor");
									this.removeStyleClass("addReportColor");
									if (data1 === 0) {
										this.addStyleClass("addReportColor");
									} else if (data1 > 0) {
										this.addStyleClass("addReportRedColor");
									}
								}
								return data1;
							}
						},
						press: function (oEvent) {}
					}),
					filterProperty: "TotalEnquiries"
				}),
				new sap.ui.table.Column({label: "Date of Enquiry", template: "Date", filterProperty: "Date"})
			]
		}).addStyleClass("tableHeader").addStyleClass("mandatoryFieldsTable");
		
		var mandatoryPopup = new sap.m.Dialog({
			id: "IDMANDATORYPOPUP",
			contentWidth: "100%",
			contentHeight: "200%",
			verticalScrolling: false,
			content: enTable.addStyleClass('sapUiNoContentPadding'),
			customHeader: [
				new sap.m.Bar({
					contentMiddle:[new sap.m.Title({text:"XOXO Enquiries Request List"})],
					contentRight:[
							new sap.m.Button({
							icon: "sap-icon://sys-cancel-2",width:"40px",
							press:function(oEvent){sap.ui.getCore().byId("IDMANDATORYPOPUP").close();}
							})]
				})]			
		}).addStyleClass('sapUiNoContentPadding');
		
		return mandatoryPopup;

	}
});