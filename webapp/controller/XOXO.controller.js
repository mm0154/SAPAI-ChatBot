sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ui/ui/supporters/Utility",
	"ui/ui/formatter/Formatter"
	// "ui/ui/supporters/Constants"
], function (Controller, Utility, formatter) { //Constants
	"use strict";

	return Controller.extend("ui.ui.controller.XOXO", {
		formatter: formatter,
		constructor: function () {
			this.utility = new Utility();
		},
		onInit: function () {

			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setData({
				"GetHospitalData": {
					"branches": [{
						"branchID": "1",
						"branchName": "India",
						"branchLocation": "New Delhi"
					}, {
						"branchID": "2",
						"branchName": "China",
						"branchLocation": "Bejing"
					}, {
						"branchID": "3",
						"branchName": "South-Africa",
						"branchLocation": "Capetown"
					}]
				}
			});
			this.getView().setModel(this.oModel);
			this.getView().getDetailPage().getContent()[0].getItems()[0].setModel(this.oModel);
			this.bExpanded = true;
			
			/* Doctor Enquiry Request List */
			this.oDocEnquiryModel=new sap.ui.model.json.JSONModel();
			this.oDocEnquiryModel.setData({
				"GetDocEnquiryData": {
					"branches": [{
						"branchID": "1",
						"branchName": "e-Buy.com",
						"branchLocation": "India",
						"TotalEnquiries":"7",
						"Enquiry":[{
							"branchID":"E1",
							"branchName":"Cosmetics",
							"Date":"8/7/17",
							"TotalEnquiries":"3",
							"Enquiry":[
								{
								"branchID":"E11",
								"branchName":"Emergency doctor availabilty",
								"TotalEnquiries":"Dr. Mathur"
							},{
								"branchID":"E12",
								"branchName":"Open-heart surgery possibility",
								"TotalEnquiries":"Dr. Mathur"
							},{
								"branchID":"E13",
								"branchName":"Open-heart surgery fee",
								"TotalEnquiries":""
							}]
						},{
							"branchID":"E2",
							"branchName":"Obstetrician",
							"Date":"8/7/17",
							"TotalEnquiries":"3",
							"Enquiry":[{
								"branchID":"E21",
								"branchName":"Emergency doctor availabilty",
								"TotalEnquiries":"Dr. Sardana"
							},{
								"branchID":"E22",
								"branchName":"Gynecologist timing availability on holidays",
								"TotalEnquiries":"Dr. Rashmi"
							},{
								"branchID":"E23",
								"branchName":"Maternity Wards booking period in advance",
								"TotalEnquiries":""
							}]
						},{
							"branchID":"E3",
							"branchName":"Asthama Specialist",
							"Date":"8/7/17",
							"TotalEnquiries":"1",
							"Enquiry":[{
								"branchID":"E31",
								"branchName":"Emergency doctor availabilty",
								"TotalEnquiries":""
							}]
						}]
					}, {
						"branchID": "2",
						"branchName": "XOXO Star Hospital",
						"branchLocation": "Indiranagar",
						"TotalEnquiries":"2",
						"Enquiry":[{
							"branchID":"E1",
							"branchName":"Cardic",
							"Date":"8/7/17",
							"TotalEnquiries":"1",
							"Enquiry":[{
								"branchID":"E21",
								"branchName":"Medical Insurance redeem process",
								"TotalEnquiries":""
							}],
						},{
							"branchID":"E2",
							"branchName":"Obstetrician",
							"Date":"8/7/17",
							"TotalEnquiries":"1",
							"Enquiry":[{
								"branchID":"E22",
								"branchName":"Child incubator cost",
								"TotalEnquiries":""
							}]
						}]
					}, {
						"branchID": "3",
						"branchName": "XOXO Civilian Hospital",
						"branchLocation": "Devanahalli",
						"TotalEnquiries":"0",
						"Enquiry":[{}]
					}]
				}
			});
			// console.log(this.oDocEnquiryModel);
		},
		onBeforeRendering: function () {
			if (!this.sideList) {
				var splitApp = sap.ui.getCore().byId("splitApp");
				this.sideList = splitApp.getCurrentMasterPage().getContent()[0];
				//adjust width to accomdate side bars
				sap.ui.getCore().byId("__app0-Master").setWidth("3.5%");
				sap.ui.getCore().byId("__app0-Detail").setWidth("96.5%");
				sap.ui.getCore().byId("__app1-Master").setWidth("97%");
				sap.ui.getCore().byId("__app1-Detail").setWidth("3%");
				//setting content for main page having forms and list
				this.firstTab = splitApp.getCurrentDetailPage().getContent()[0].getItems()[0];

				if (this.oModel.getData().GetHospitalData) {
					var branchInfo = this.oModel.getData().GetHospitalData.branches,
						k = 0;
					for (var i = 0; i < branchInfo.length; i++) {
						this.sideList.addItem(new sap.tnt.NavigationListItem("mainItem" + k++, {
							text: branchInfo[i].branchName,
							icon: "sap-icon://menu2"
						}));
					}
					this.k = k;
					if (!this.oBranchContent) {
						this.oBranchContent = sap.ui.jsfragment("ui.ui.view.Branches", this);
						this.firstTab.addContent(this.oBranchContent);
					}
					var solModel = new sap.ui.model.json.JSONModel();
					var solData = this.getView().getModel().getData().GetHospitalData.branches[0];
					solModel.setData(solData);
					this.getView().setModel(solModel, "solModel");
					this.oBranchContent.setModel(solModel, "solModel");
					this.activeTab = "Branches";
				}
			}
		},
		onAfterRendering: function () {
			this.getBot(); //get user uuid of your bot account in recast.ai
			sap.ui.getCore().byId("chatBtn").attachPress(this.openBot.bind(this)); //attaching press to open chat window
			this.detailContent = this.getView().getContent()[0].getContent()[0].getCurrentMasterPage().getContent()[0].getCurrentDetailPage().getCurrentDetailPage();
		},
		/**
		 * Open Bot Fragment
		 * Bot over footer button
		 **/
		openBot: function (oEvent) {
			if (!this.oChatBot) {
				this.oChatBot = sap.ui.jsfragment("ui.ui.view.ChatBot", this);
				this.oChatInput = this.oChatBot.getContent()[0].getContent()[1].getContent()[0];
				this.oChatInput.attachLiveChange(this.addConversation.bind(this));
			}
			var oModel = new sap.ui.model.json.JSONModel({
				data: {}
			});
			this.oChatBot.setModel(oModel);
			this.oChatBot.openBy(this.detailContent.getFooter().getContentRight()[1]);
			// Init listeners
			this.chatInput = document.getElementById("chat");
			this.chatInput.addEventListener("keyup", this.parseText.bind(this), false);
			this.history = document.getElementById("oLabel1");

			this.isTyping = false;
		},
		/**
		 **
		 * parseText is the callback for the keyup eventlistener, and listens for
		 * enter key to be pressed, signaling that the user has entered a message.
		 *
		 * @param {Event} event          - keyup from chatInput
		 *
		 */
		parseText: function (event) {
			var message;

			if (event.keyCode === 13 && sap.ui.getCore().byId("chat").getValue()) {
				message = sap.ui.getCore().byId("chat").getValue().trim();

				// message is "sent" and triggers bot "response" with small delay
				if (message !== "") {
					sap.ui.getCore().byId("chat").setValue("");
					this.createMessage("user", message);
					// Only respond to one message at a time
					if (!this.isTyping) {
						var that = this;
						this.isTyping = true;
						setTimeout(function () {
							that.respondTo(message);
						}, Math.random() * (4000) + 1000);
					}
				}
			}
		},
		/*
		 * respondTo responds to the user's message by picking random lorem ipsum
		 * words from the words object.
		 *
		 * @param  {String} message    - incoming message string
		 *
		 */
		respondTo: function (message) {
			var response = "", // String to hold generated response
				responseLength, // number of words in response
				numChars, // number of characters in word
				selectedWord, // index of selected word (by length)
				delay, // chat bot delay in ms
				msgLength, // number of words in @message String
				comma; // optional comma

			// short sentences typically get short responses.
			if (message.indexOf(" ") === -1)
				msgLength = 1;
			else
				msgLength = message.split(" ").length;

			// maximum response length is 2 more words than the incoming message
			responseLength = Math.ceil(Math.random() * (msgLength + 2));

			// longer sentences should get a comma
			if (responseLength > 8)
				comma = Math.ceil(responseLength / 2);

			// simulated delayed response
			delay = Math.ceil(Math.random() * (responseLength + 1) * 1000) + 2500;
			if (msgLength > 0) { //if user has inputted message then
				var _data = {
					"message": {
						"type": "text",
						"content": message
					},
					"conversation_id": "test-1533969037613",
					"log_level": "info"
				};
				var that = this;
				$.ajax({
					type: "POST",
					data: JSON.stringify(_data),
					url: "https://" + "api.recast.ai/build/v1/dialog",//bot connector callback url you will find under settings>options
					contentType: "application/json",
					path: "/build/v1/dialog",
					scheme: "https",
					headers: {
						"Authorization": "Token 8b83f0f2f4cee9193d4b371d53dad8b7",//developer token
						"x-uuid": that.uuid
					},
					success: function (data) {
						// do what you need to 
						that.pqaBotConversation = data;
						that.createMessage("bot", data.results.messages[0].content, delay);
					},
					error: function (data) {
						that.botError = data;
					}
				});
			}
		},
		/**
		 * createMessage creates a message with an optional delay and posts it to the
		 * .chat_history window.
		 *
		 * @param  {String} from       - "user", "bot" class
		 * @param  {String} message    - message
		 * @param  {Number} delay      - delay in MS
		 *
		 */
		createMessage: function (from, message, delay) {
			var p, // paragraph element for message
				img, // image for avatar
				innerDiv, // inner div to hold animation and avatar
				outerDiv, // outer div for clearing floats
				animationSequence, // class list for animation
				position; // left or right

			// paragraph
			p = document.createElement("p");

			// img
			img = document.createElement("img");

			if (from === "bot") {
				img.src = "https:"+"//sdlambert.github.io/loremipsum/img/helmet1.svg";
				position = "left";
			} else if (from === "user") {
				img.src = "https:"+"//sdlambert.github.io/loremipsum/img/user168.svg";
				position = "right";
			}

			img.classList.add("avatar", "middle", position);

			// inner div
			var innerDiv = document.createElement("div");
			innerDiv.appendChild(img);
			innerDiv.classList.add(from);
			var p;
			// add animation, remove animation, add message
			if (delay) {
				this.addAnimation(innerDiv);
				var that = this;
				setTimeout(function () {
					that.removeAnimation(innerDiv);
					p.appendChild(document.createTextNode(message));
					innerDiv.appendChild(p);
					that.history.scrollTop = that.history.scrollHeight;
					that.isTyping = false;
				}, delay);
			} else {
				// no delay, just post it
				p.appendChild(document.createTextNode(message));
				innerDiv.appendChild(p);
			}

			//outer div
			outerDiv = document.createElement("div");
			outerDiv.appendChild(innerDiv);
			outerDiv.classList.add("full");

			// history
			this.history.appendChild(outerDiv);
			this.history.scrollTop = this.history.scrollHeight;

		},
		/**
		 * addAnimation adds the "typing" animation to element by appending the
		 * animation sequence divs to the target element.
		 *
		 * @param {HTMLElement} element  - the target Element
		 *
		 */
		addAnimation: function (element) {
			var animationSequence = ["one", "two", "three"];

			animationSequence.forEach(function (animationClass) {
				var newDiv = document.createElement("div");
				newDiv.classList.add("bouncer", animationClass);
				element.appendChild(newDiv);
			});
		},
		/**
		 * removeAnimation removes the "typing" animation by removing all of the
		 * child divs of the target element.
		 *
		 * @param  {HTMLElement} element - the target Element
		 *
		 */
		removeAnimation: function (element) {
			var i = element.childNodes.length - 1;

			for (; i >= 0; i--)
				if (element.childNodes[i].tagName === "DIV")
					element.removeChild(element.childNodes[i]);
		},
		/**
		 * Get your Recast user account uuid
		 * Unique key helps you load your bots into ui5
		 **/
		getBot: function () {
			var that = this;
			//check your user-slug in SAP Conversational AI 
			$.ajax({
				type: "GET",
				url: "https://" + "api.recast.ai/auth/v1/owners/manisha-madhwani",
			
				headers: {
					"Authorization": "63fea95075c0084de2f5ea663371c475"//request token
				},
				success: function (data) {
					that.uuid = data.results.owner.id;
					 //console.log("uuid" + that.uuid);
				},
				error: function (data) {}
			});

		},
		addConversation: function (oEvent) {
			// var newValue = oEvent.getParameter("value");
			// var that = this;
		},
		dispEnquiryList:function(oEvent){
			if(this.oDocEnquiryModel){
				if(!this.enView){
					this.enView =new sap.ui.jsfragment("ui.ui.view.Enquiries");
				}
				var enTable=this.enView.getContent()[0];
				enTable.setModel(this.oDocEnquiryModel);
				enTable.bindRows("/GetDocEnquiryData");
				this.enView.open();
			}
		}

	});
});