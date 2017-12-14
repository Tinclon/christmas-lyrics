/*window.addEventListener("load", function () {
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 1000);
});*/

Ext.define('Lyrics.LeafView', {
    extend: 'Ext.Panel',
    config: {
        cls: 'leaf',
        styleHtmlContent: true,
		scrollable: true,
		layout: {
			type: 'fit'
		}
    }
});

/*global Ext:false */
Ext.application({
	/*viewport: {
        autoMaximize: true
    },*/
    launch: function () {
    	/*var container = Ext.create('Ext.Panel', {
    		layout: 'vbox',
			scrollable : {
      			direction: 'vertical',
      			directionLock: true
			}
    	});*/
        var nestedList = Ext.create('Ext.NestedList', {
        	title: 'Christmas Lyrics',
        	//flex: 1,
        	fullscreen: true,
            store: treeStore,
            detailCard: new Lyrics.LeafView(),
            listeners: {
                leafitemtap: function (nestedList, list, index, target, record) {
                    var detailCard = nestedList.getDetailCard();
	                detailCard.setHtml("");
	                
                	setTimeout(function(){list.deselect(index);}, 1000);
                	
                	var parent = record.parentNode;
                	var path = record.get('text') + ".txt";
                	while(parent.get('text') !== 'ChristmasLyrics') {
                		path = parent.get('text') + "/" + path;
                		parent = parent.parentNode;
                	}
                	path = "resources/content/" + path;
                	
                	/*list.setMasked({
                        xtype: 'loadmask',
                        message: 'Loading'
                    });*/
                    
            		Ext.Ajax.request({
                         url: path.replace(/[^a-zA-Z0-9\/\.]/g,'_').toLowerCase(),
                         success: function(response) {
                             detailCard.setHtml(response.responseText.replace(/[\n\r]/g,"<br/>"));
                             //list.unmask();
                         },
                         failure: function() {
                             detailCard.setHtml("Under construction. Please try again later.");
                             //list.unmask();
                         }
                	});
                }
            }
        });
        //container.add(nestedList);
        //Ext.Viewport.add(container);
        Ext.Viewport.add(nestedList);
    }
});
