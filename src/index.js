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
    $(searchInputNode).queryIntime({
        func: function(value){
            if(value.length == 0){
                return;
            }else{
              this.props.handlePeopleSearchCon(value);
            }
        }.bind(this)
    });
  },
  render:function(){
    return (
        <div className="mbox784_textwrap">
          <textarea id="textarea" rows="1" className="M01text" ref = "searchtext"></textarea>
        </div>
    )
  }
});

var PeopleLi = React.createClass({
  handleClick:function(e){
    e.preventDefault();
    var peopleLiNode = ReactDOM.findDOMNode(this.refs.myLi);
    var nodeName = $(peopleLiNode).children('h5').html();
    this.props.receive(nodeName);
    //console.log(nodeName);
  },
  render:function(){
    return (
        <li onClick = {this.handleClick} ref = "myLi">
          <a href="#" target="_blank"><img src={this.props.Avatar} width="60" height="60" /></a>
          <h5>{this.props.name}</h5>
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
  fnn:function(){console.log(11111)},
  render:function(){
    var LiNode = this.props.peopleData.map(function(peopleData){
            return <PeopleLi Avatar = {peopleData.Avatar} name={peopleData.Name} 
                    Dept ={peopleData.Dept} key = {peopleData.ID} 
                    receive = {this.props.fnn}></PeopleLi>
        })
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
  componentDidMount: function() {
    var nameArr = [];
  },
  handleReceive:function(name){
    nameArr.push(name); 
    console.log(nameArr);
  },
  render:function(){
    return (
      <div className = "mbox784" >
        <PeopleTitle />
        <PeopleSearch handlePeopleSearchCon = {this.props.handlePeopleSearch} nameData = {this.nameArr}/>
        <PeopleList peopleData = {this.props.peopleData} 
        PeoplehandleScroll ={this.props.ConhandleScroll}
        ureceives = {this.handleReceive}/>
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
        this.setState({data: data});
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
        this.setState({data: data});
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
              this.setState({data: newPeoples});            
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="mbox_BombBox" >
        <PeopleCon peopleData = {this.state.data} handlePeopleSearch = {this.searchDataFromServer} 
        ConhandleScroll ={this.handleScroll}/>
      </div>
    );
  }
});



ReactDOM.render(
  <PeopleBox url = "comments.json" />,
  document.getElementById('content')
);
