(this.webpackJsonppidgin=this.webpackJsonppidgin||[]).push([[0],{144:function(e,t,a){e.exports=a(202)},149:function(e,t,a){},150:function(e,t,a){},202:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),c=a(131),i=a.n(c),s=(a(149),a(132)),r=a(133),o=a(140),d=a(138),u=(a(150),a(217)),m=a(139),p=a(137),E=a(218),f=a(46),h=a(26),g=a(34),v=a.n(g);a(165),a(166);v.a.initializeApp({apiKey:"AIzaSyCYoIBWm4Hw6kCP1P6jPWvqgJsXQdFmuPM",authDomain:"pidgin-ds.firebaseapp.com",databaseURL:"https://pidgin-ds.firebaseio.com",projectId:"pidgin-ds",storageBucket:"pidgin-ds.appspot.com",messagingSenderId:"651681146366",appId:"1:651681146366:web:dca41ccad229815cbb0caf",measurementId:"G-R2H7TXW5LZ"}),v.a.analytics();v.a.auth();var b,y,w=v.a.firestore();v.a,Object(u.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},gridList:{width:500,height:450}}}));function x(e){var t=e.match;return b=t.params.id,n.a.createElement("div",null)}var C=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var l=arguments.length,n=new Array(l),c=0;c<l;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={classes:null,images:null,eligibility:null,qualifications:null,note:null,courses:null,offers:null},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;w.collection("Classes").doc(b).collection("Information").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({classes:a})})),w.collection("Classes").doc(b).collection("Images").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({images:a})})),w.collection("Classes").doc(b).collection("Eligibility").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({eligibility:a})})),w.collection("Classes").doc(b).collection("Qualifications").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({qualifications:a})})),w.collection("Classes").doc(b).collection("Note").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({note:a})})),w.collection("Classes").doc(b).collection("Courses").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({courses:a})})),w.collection("Classes").doc(b).collection("Offers").get().then((function(t){var a=[];t.forEach((function(e){var t=e.data();a.push(t)})),e.setState({offers:a})}))}},{key:"render",value:function(){var e=this;return n.a.createElement(f.a,null,this.state.classes&&this.state.classes.map((function(t){return y=t.colorOverlay,n.a.createElement("div",null,n.a.createElement(f.a,null,n.a.createElement("div",{class:"App"},n.a.createElement("div",{class:"wallpaper"},n.a.createElement("img",{src:t.wallpaper,alt:"Avatar",class:"image"}),n.a.createElement("div",{class:"overlay",style:{background:y}},n.a.createElement("div",{class:"avatar"},n.a.createElement(p.a,{src:t.profileImage,round:"50%",size:"150",style:{background:"white"}})))),n.a.createElement("div",{class:"details"},n.a.createElement(E.a,{boxShadow:2,bgcolor:"transparent"},n.a.createElement("table",{class:"table"},n.a.createElement("tr",{class:"tr"},n.a.createElement("td",{class:"th"},t.classes,"/week"),n.a.createElement("td",{class:"th"},"\u20b9",t.fees,"/class"),n.a.createElement("td",{class:"th"},t.experience)),n.a.createElement("tr",null,n.a.createElement("td",{align:"center"},"Classes"),n.a.createElement("td",{align:"center"},"Fees"),n.a.createElement("td",{align:"center"},"Experience"))))),n.a.createElement("div",{class:"carousel"},e.state.offers&&e.state.offers.map((function(e){return n.a.createElement("div",{class:"offer",style:{borderColor:y}},n.a.createElement("table",{style:{width:"150px",height:"auto"}},n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement(m.a,null)),n.a.createElement("td",null,e.title)),n.a.createElement("tr",null,n.a.createElement("td",null),n.a.createElement("td",null,e.detail))))}))),n.a.createElement("div",{class:"container"},n.a.createElement("div",{class:"head"},"General"),n.a.createElement("div",{class:"info"},n.a.createElement("div",{class:"field"},"Age"),n.a.createElement("div",{class:"attribute"},t.age)),n.a.createElement("div",{class:"info"},n.a.createElement("div",{class:"field"},"Type"),n.a.createElement("div",{class:"attribute"},t.type)),n.a.createElement("div",{class:"info"},n.a.createElement("div",{class:"field"},"Duration"),n.a.createElement("div",{class:"attribute"},t.duration)),n.a.createElement("div",{class:"info"},n.a.createElement("div",{class:"field"},"Timings"),n.a.createElement("div",{class:"attribute"},t.timings)),n.a.createElement("div",{class:"head"},"Highlights"),n.a.createElement("div",{class:"carousel"},e.state.images&&e.state.images.map((function(e){return n.a.createElement("img",{src:e.item})}))),n.a.createElement("div",{class:"head"},"Courses"),e.state.courses&&e.state.courses.map((function(e){return n.a.createElement("table",{class:"courseTable"},n.a.createElement("tr",null,n.a.createElement("td",{style:{height:"50px",width:"50px"},rowSpan:"2"},n.a.createElement("img",{src:e.image,style:{height:"50px",width:"50px",marginRight:"10px"}})),n.a.createElement("td",{style:{fontSize:"14px",height:"auto",paddingBottom:"0px"}},e.title)),n.a.createElement("tr",null,n.a.createElement("td",{style:{fontSize:"14px",paddingTop:"0px"}},"\u20b9",e.price)))})),n.a.createElement("div",{class:"head"},"Eligibility"),n.a.createElement("ul",{class:"list"},e.state.eligibility&&e.state.eligibility.map((function(e){return n.a.createElement("li",null,e.item)}))),n.a.createElement("div",{class:"head"},"Qualifications"),n.a.createElement("div",{class:"listHeader"},t.teacher),n.a.createElement("ul",{class:"list"},e.state.qualifications&&e.state.qualifications.map((function(e){return n.a.createElement("li",null,e.item)}))),n.a.createElement("div",{class:"head"},"Note from Teacher"),n.a.createElement("ul",{class:"list"},e.state.note&&e.state.note.map((function(e){return n.a.createElement("li",null,e.item)}))),n.a.createElement("div",{style:{height:"50px",textAlign:"center",paddingTop:"20px"}},n.a.createElement("p",{class:"tail"},"\xa9Pidgin2020"))))))})),n.a.createElement(h.a,{path:"/:id",component:x}))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(f.a,null,n.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[144,1,2]]]);
//# sourceMappingURL=main.3cc6c9ee.chunk.js.map