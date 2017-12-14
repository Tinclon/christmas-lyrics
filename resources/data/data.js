Ext.define('ListItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['text']
    }
});
        
var treeStore = Ext.create('Ext.data.TreeStore', {
	model: 'ListItem',
    defaultRootProperty: 'items',
    root: {
    	text: 'ChristmasLyrics',
        items: [
        	{ text: 'A-M', items: [
        		{ text: 'Angels We Have Heard On High', leaf: true }
        		]
        	},
        	{ text: 'N-Z', items: [
        		]
        	} ]
        }
});