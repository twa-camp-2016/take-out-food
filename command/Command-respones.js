class  CommandResponse
{
  constructor(text,newmapping,next,restet)
  {
    this._text=text;
    this._newmapping=newmapping;
    this._next=next;
    this._restet=restet;
  }
  set text(text) {
    this._text = text;
  }
  set newmapping(newmapping)
  {
    this._newmapping=newmapping;
  }
  set next(next)
  {
    this._next=next;
  }
  set restet(restet)
  {
    this._restet=restet;
  }
}
module.exports=CommandResponse;
