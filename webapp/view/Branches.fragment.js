sap.ui.jsfragment("ui.ui.view.Branches", {

	// defines the UI of this View
	createContent: function() {
		// button text is bound to Model, "press" action is bound to Controller's event handler
		var oForm = new sap.ui.layout.form.SimpleForm("SimpleFormDisplay480", {
			maxContainerCols: 3,
			editable: true,
			layout: "ResponsiveGridLayout",
			labelSpanL: 4,
			labelSpanM: 4,
			emptySpanL: 0,
			emptySpanM: 0,
			columnsL: 3,
			columnsM: 3,
			minWidth: 1024,
			visible: true
		}).addStyleClass("sapUiNoContentPadding");
		this.createBranchForm(oForm);

		var vBox = new sap.m.VBox({
			fitContainter: true
		});
		vBox.addItem(oForm);
		
		return vBox;
	},
	createBranchForm: function(oForm) {
		oForm.addContent(new sap.ui.core.Title({
			text: "General Section"
		}));
		oForm.addContent(new sap.m.Label({
			text: "Branch Name",
			tooltip: "Branch Name",
			required: true
		}));
		oForm.addContent(new sap.m.Text({
			text: "{solModel>/branchName}"
		}));
		oForm.addContent(new sap.m.Label({
			text: "Branch Location",
			required: true
		}));
		oForm.addContent(new sap.m.Text({
			text: "{solModel>/branchLocation}"
		}));
		
		oForm.setLayoutData(new sap.m.FlexItemData({
			shrinkFactor: 0,
			backgroundDesign: "Solid",
			styleClass: "sapContrastPlus"
		}));
		return oForm;
	}
});

