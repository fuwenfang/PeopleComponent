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
  handleKeyDowm:function(e){
    if(e.keyCode == 20){

      var searchtext = this.refs.searchtext.value;
      if(!searchtext){
        return;
      }else{
        this.props.handlePeopleSearchCon(searchtext);
      }
    }
    return;
  },
  render:function(){
    return (
        <div className="mbox784_textwrap">
          <textarea id="textarea1" rows="1" className="M01text" ref = "searchtext"  onKeyDown = {this.handleKeyDowm}></textarea>
        </div>
    )
  }
});

var PeopleLi = React.createClass({
  render:function(){
    return (
        <li>
          <a href="#" target="_blank"><img src={this.props.Avatar} width="60" height="60" /></a>
          <h5>{this.props.name}</h5>
          <div className="zhiwei"><a href="#" target="_blank">{this.props.Dept}</a></div>
        </li>
    )
  }
})

var PeopleList = React.createClass({
  render:function(){
    var LiNode = this.props.peopleData.map(function(peopleData){
            return <PeopleLi Avatar = {peopleData.Avatar} name={peopleData.Name} 
            Dept ={peopleData.Dept} key = {peopleData.ID}></PeopleLi>
        })
    return (
        <div className="mbox_BombBoxList01">
          <ul className="clearfix m_list02">
              {LiNode}
          </ul>
        </div>
    )
  }
});



var PeopleCon = React.createClass({
  render:function(){
    return (
      <div className = "mbox784">
        <PeopleTitle />
        <PeopleSearch handlePeopleSearchCon = {this.props.handlePeopleSearch}/>
        <PeopleList peopleData = {this.props.peopleData}/>
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
      var scroll_height = ReactDOM.findDOMNode(this.refs.bomBox).scrollHeight;
      var  win_height = ReactDOM.findDOMNode(this.refs.bomBox).clientHeight;
      var scroll_top = ReactDOM.findDOMNode(this.refs.bomBox).scrollTop;
      var oldPeoples = this.state.data;
      if ((scroll_height - win_height - scroll_top) <=0) {
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
          
      }
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="mbox_BombBox" onScroll = {this.handleScroll} ref = "bomBox">
        <PeopleCon peopleData = {this.state.data} handlePeopleSearch = {this.searchDataFromServer}/>
      </div>
    );
  }
});



ReactDOM.render(
  <PeopleBox url = "comments.json" />,
  document.getElementById('content')
);
