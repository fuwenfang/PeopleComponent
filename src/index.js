/**
 * Created by fuwenfang on 3/21/16.
 */
var React = require('react');
var ReactDOM = require('react-dom');


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
    var searchInputNode = ReactDOM.findDOMNode(this.refs.searchtext);

    //$(searchInputNode).textext({ plugins: 'tags' });

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

            this.props.handlePeopleSearchCon(searchInputNodeValue);
        }.bind(this),
        500
    );
  },
  handleTags:function(e){
    var nameItem = this.props.nameItemData;
    var nameThis = this.props.nameItemData[e]
    if(nameItem.indexOf(nameThis)>=0){
        nameItem.splice(nameItem.indexOf(nameThis),1);
    }
    this.setState({item:nameItem}); 
    console.log(this.props.nameItemData);
  },
  render:function(){
      var nameTags = this.props.nameItemData.map(function(nameItemData,i){
            return <span ref="nameSpan" key = {i}  onClick={this.handleTags.bind(this,i)}>{nameItemData}</span>
        },this)
    return (
        <div className="mbox784_textwrap">
          <textarea id="textarea" rows="1" className="M01text" ref = "searchtext" 
          onKeyUp = {this.handleUp}></textarea>
          <p className = "dev-tags">{nameTags}</p>
        </div>
    )
  }
});

var PeopleLi = React.createClass({

  handleClick:function(e){
    e.preventDefault();
    var peopleLiNode = ReactDOM.findDOMNode(this.refs.myLiName);
    var nodeName = ReactDOM.findDOMNode(this.refs.myLiName).innerHTML;
    this.props.ListClick(this.props.index);

    $('#textarea').val(''); 
    if (!this.props.ckChecked) {

      //$('#textarea').textext()[0].tags().addTags([ nodeName ]);
    };    
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
                    ListClick = {this.props.conClick}></PeopleLi>
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

var PeopleCon = React.createClass({

  render:function(){
    return (
      <div className = "mbox784" >
        <PeopleTitle />
        <PeopleSearch handlePeopleSearchCon = {this.props.handlePeopleSearch}  nameItemData = {this.props.nameItemData}/>
        <PeopleList peopleData = {this.props.peopleData} 
        PeoplehandleScroll ={this.props.ConhandleScroll}
        conClick = {this.props.boxLIst}
        />
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
    return {data: [],item:[]};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  boxhandleClick:function(index){
    var stateDate = this.state.data
    var stateItem =this.state.item;
    $.each(stateDate,function(i,n){
      if(i==index){
        stateDate[i].ckChecked = true;
        return;
      }else{
        return;
      }     
    });
    if(stateItem.indexOf(stateDate[index].Name)<0){
        stateItem.push(stateDate[index].Name);
    }
    this.setState({data:stateDate,item:stateItem}); 
    console.log(this.state.item);
  },
  render: function() {
    return (
      <div className="mbox_BombBox" >
        <PeopleCon peopleData = {this.state.data}  nameItemData = {this.state.item}
        handlePeopleSearch = {this.searchDataFromServer} 
        ConhandleScroll ={this.handleScroll}
        boxLIst = {this.boxhandleClick}/>
      </div>
    );
  }
});



ReactDOM.render(
  <PeopleBox url = "comments.json" />,
  document.getElementById('content')
);
