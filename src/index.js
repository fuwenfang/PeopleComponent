/**
 * Created by fuwenfang on 3/21/16.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var PubSub = require('pubsub-js');

var PeopleTitle = React.createClass({
  render:function(){
    return (
      <div className="mbox_filter clearfix">
      <h6>按负责人筛选</h6>
      <div className="mbox_filter_close01"></div>
    </div>
    )
  }
});

var PeopleSearch = React.createClass({
  componentDidMount: function() {
   
  },
  getInitialState: function() {
    return {
      value: ''
    };
  },
  componentDidMount: function () {
    this.pubsub_token = PubSub.subscribe('peoples', function (topic, product) {
      this.setState({
        value: product
      });
      console.log(product);
    }.bind(this));

  },
  componentWillUnmount: function () {
    PubSub.unsubscribe(this.pubsub_token);
  },
  handleDown:function(e){
    var nameItem = this.props.nameItemData;
    var nameitemWidth = this.props.nameitemWidth;
    var nameWidthThis = this.props.nameitemWidth[nameItem.length-1];
    var searchInputNodeValue = ReactDOM.findDOMNode(this.refs.searchtext).value;

    if(e.keyCode == 8 && searchInputNodeValue.length ==0){
      
      nameItem.splice(nameItem.length-1,1);
      nameitemWidth.splice(nameitemWidth.length-1,1);
      last.splice(last.length-1,1);
      var newtextareaPadding = 0;
      // for(var i = 0; i<last.length;i++){
      //   newtextareaPadding +=last[i];
      // }
      for(var i = 0; i<nameitemWidth.length;i++){
        newtextareaPadding +=nameitemWidth[i].width;
      }
      this.props.hhandleDown(nameItem,nameitemWidth,newtextareaPadding);
      //console.log(last);
      console.log(this.props.nameItemData);
      console.log(this.props.nameitemWidth);

    }

  },
  handleUp :function(e){
    
    this.startTimer(e);
  },

  startTimer:function(e){
    var searchInputNodeValue = ReactDOM.findDOMNode(this.refs.searchtext).value;
    var that = e.target;
    clearTimeout(that.timer);

    that.timer = setTimeout(
        function()
        {
            delete that.timer;
            // why delete? it is about high performance?
            if(searchInputNodeValue !=0){
              this.props.handlePeopleSearchCon(searchInputNodeValue);

            }

        }.bind(this),
        500
    );
  },
  handleTags:function(e){
    var nameItem = this.props.nameItemData;
    var nameThis = this.props.nameItemData[e];
    var nameWidthItem = this.props.nameitemWidth;
    var nameWidthThis = this.props.nameitemWidth[e];
  
    if(nameItem.indexOf(nameThis)>=0){
        nameItem.splice(nameItem.indexOf(nameThis),1);
        nameWidthItem.splice(nameWidthItem.indexOf(nameWidthThis),1);
        last.splice(e,1);
        var newtextareaPadding = 0;
        // for(var i = 0; i<last.length;i++){
        //   newtextareaPadding +=last[i];
        // }
        for(var i = 0; i<nameWidthItem.length;i++){
          newtextareaPadding +=nameWidthItem[i].width;
        }
    }
    
    this.props.hhandleTags(nameItem,nameWidthItem,newtextareaPadding);
    console.log(this.props.nameitemWidth);
    console.log(last);
    console.log(this.props.nameItemData);
  },

  render:function(){
      var nameTags = this.props.nameItemData.map(function(nameItemData,i){
            return <span className ="nameSpan" ref="nameSpan" key = {i}  onClick={this.handleTags.bind(this,i)}>{nameItemData}</span>
        },this);
    return (
        <div className="mbox784_textwrap">
          <textarea id="textarea" rows="1" className="M01text" ref = "searchtext" 
          style={{paddingLeft: (10+this.props.textareaPadding) + 'px'}} 
          onKeyUp = {this.handleUp} onKeyDown = {this.handleDown} defaultvalue = {this.state.value}></textarea>
          <p className = "dev-tags">{nameTags}</p>
        </div>
    )
  }
});
var last = [];

var PeopleLi = React.createClass({

  handleClick:function(e){
    e.preventDefault();
    var peopleLiNode = ReactDOM.findDOMNode(this.refs.myLiName);
    var nodeName = ReactDOM.findDOMNode(this.refs.myLiName).innerHTML;
    var itemWidth = 11;
    for(var i = 0; i<nodeName.length;i++){
      //汉字
      if(nodeName.charCodeAt(i) > 255){
        itemWidth += 12;
      }else{
        itemWidth += 6;
      }
    };
    if(this.props.nameItemData.indexOf(nodeName)<0){
       last.push(itemWidth);

    }
    console.log(last);

    var InittextareaPadding = 0;
    for(var i = 0; i<last.length;i++){
      InittextareaPadding +=last[i];
    }

    this.props.ListClick(this.props.index,itemWidth,InittextareaPadding);

    PubSub.publish('peoples', '111');
    
  },
  render:function(){
    return (
        <li onClick = {this.handleClick} ref = "myLi" ckChecked = {this.props.ckChecked} >
          <a href="#" target="_blank"><img src={this.props.Avatar} width="60" height="60" /></a>
          <h5 ref = "myLiName">{this.props.name}</h5>
          <div className="zhiwei"><a href="#" target="_blank">{this.props.Dept}</a></div>
        </li>
    )
  }
})

var PeopleList = React.createClass({
  PeopleListScroll:function(){
      var scroll_height = ReactDOM.findDOMNode(this.refs.ListBox).scrollHeight;
      var  win_height = ReactDOM.findDOMNode(this.refs.ListBox).clientHeight;
      var scroll_top = ReactDOM.findDOMNode(this.refs.ListBox).scrollTop;
      if ((scroll_height - win_height - scroll_top) == 0 && scroll_top>0) {
          this.props.PeoplehandleScroll();
      }
  },
  
  render:function(){
    var LiNode = this.props.peopleData.map(function(peopleData,i){
            return <PeopleLi Avatar = {peopleData.Avatar} name={peopleData.Name} 
                    Dept ={peopleData.Dept} index = {peopleData.nid} key = {i} ckChecked = {peopleData.ckChecked}
                    ListClick = {this.props.conClick} nameItemData = {this.props.nameItemData}></PeopleLi>
        },this)
    return (
        <div className="mbox_BombBoxList01" onScroll = {this.PeopleListScroll} ref = "ListBox">
          <ul className="clearfix m_list02" >
              {LiNode}
          </ul>
        </div>
    )
  }
});

var ConfirmForm = React.createClass({
  ClickButton:function(){
      console.log(this.props.nameItemData);
  },
  render:function(){
    return (
        <div className = "m_btn01 clearfix">
            <div className="m_btn01L" onClick = {this.ClickButton}>确认</div>
            <div className="m_btn01R">取消</div>
        </div>
      )
  }
});
var PeopleCon = React.createClass({

  render:function(){
    return (
      <div className = "mbox784" >
        <PeopleTitle />
        <PeopleSearch handlePeopleSearchCon = {this.props.handlePeopleSearch}  nameItemData = {this.props.nameItemData} 
        nameitemWidth = {this.props.nameitemWidth} textareaPadding = {this.props.textareaPadding}
        hhandleTags = {this.props.hhhandleTags} hhandleDown = {this.props.hhhhandleDown}/>
        <PeopleList peopleData = {this.props.peopleData} 
        PeoplehandleScroll ={this.props.ConhandleScroll}
        conClick = {this.props.boxLIst}
        nameItemData = {this.props.nameItemData}/>
        <ConfirmForm nameItemData = {this.props.nameItemData} />
      </div>
    )
  }
});

var PeopleBox = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      data:"",
      success: function(data) {
        var mydata = [];
        $.each(data,function(i,n){
          n.nid = i;
          n.ckChecked = false;
          mydata.push(n);
        })
        this.setState({data: mydata});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  searchDataFromServer:function(text){
    $.ajax({
      url: "search.json",
      dataType: 'json',
      cache: false,
      data:{text},
      success: function(data) {
        var mydata = [];
        $.each(data,function(i,n){
          n.nid = i;
          n.ckChecked = false;
          mydata.push(n);
        })
        this.setState({data: mydata});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleScroll:function(){     
      var oldPeoples = this.state.data;
          $.ajax({
            url: "pagetwo.json",
            dataType: 'json',
            cache: false,
            data:"",
            success: function(data) {
              var newPeoples = oldPeoples.concat(data);
              var mydata = [];
              $.each(newPeoples,function(i,n){
                n.nid = i;
                n.ckChecked = false;
                mydata.push(n);
              })
              this.setState({data: mydata});   
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
  },
  getInitialState: function() {
    return {data: [],item:[],itemWidth:[],textareaPadding:0};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  boxhandleClick:function(index,itemWidth,InittextareaPadding){
    var stateDate = this.state.data
    var stateItem =this.state.item;
    var stateItemWidth = this.state.itemWidth;
    $.each(stateDate,function(i,n){
      if(i==index){
        stateDate[i].ckChecked = true;
        return;
      }else{
        return;
      }     
    });

    if(stateItem.indexOf(stateDate[index].Name)<0){
        // var itemWidth = 8;
        // for(var i = 0; i<stateDate[index].Name.length;i++){
        //   //汉字
        //   if(stateDate[index].Name.charCodeAt(i) > 255){
        //     itemWidth += 12;
        //   }else{
        //     itemWidth += 6;
        //   }
        // }
        stateItem.push(stateDate[index].Name);
        stateItemWidth.push({name:stateDate[index].Name,width:itemWidth});

    }
    this.setState({data:stateDate,item:stateItem,itemWidth:stateItemWidth}); 

    // var InittextareaPadding = 0;
    // for(var i= 0; i<stateItemWidth.length;i++){
    //   InittextareaPadding += stateItemWidth[i].width;
    // }
    // var sumtextareaPadding=InittextareaPadding ;

    this.setState({textareaPadding:InittextareaPadding});
    $('#textarea').val('');

  },
  boxhandleTags:function(nameItem,nameWidthItem,newtextareaPadding){
    this.setState({item:nameItem,itemWidth:nameWidthItem,textareaPadding:newtextareaPadding}); 
  },
  boxhandleDown:function(nameItem,nameWidthItem,newtextareaPadding){
    this.setState({item:nameItem,itemWidth:nameWidthItem,textareaPadding:newtextareaPadding}); 
  },

  render: function() {
    return (
      <div className="mbox_BombBox" >
        <PeopleCon peopleData = {this.state.data}  nameItemData = {this.state.item} nameitemWidth = {this.state.itemWidth}
        handlePeopleSearch = {this.searchDataFromServer} textareaPadding = {this.state.textareaPadding}
        ConhandleScroll ={this.handleScroll}
        boxLIst = {this.boxhandleClick}
        hhhandleTags = {this.boxhandleTags} hhhhandleDown = {this.boxhandleDown}/>
      </div>
    );
  }
});



ReactDOM.render(
  <PeopleBox url = "comments.json" />,
  document.getElementById('content')
);
