var FidoHTML = function(){
   if (!(this instanceof FidoHTML)) return new FidoHTML();
};

var symbols = [[/  /g, ' \u00A0'], [/&/g, '&amp;'], [/</g, '&lt;'],
               [/>/g, '&gt;'], [/\x22/g, '&quot;'], [/\r?\n/g, '<br>']];

var afterURL = function(middle){
   return symbols.reduce(function(result, symbol){
      return result.replace(symbol[0], symbol[1]);
   }, middle);
};

var wrapLink = function(link) {
   return '<a href="' + link + '">' + link + '</a>';
};

FidoHTML.prototype.fromText = function(msgText){
   /* jshint -W101 */
   var lines = msgText.replace(/(^|\r?\n) /g, '$1\u00A0').split(
      /(\b(?:https?|ftp|mailto|bitcoin|ed2k|facetime|feed|geo|irc(?:6|s)?|magnet|news|nntp|sips?|skype|sms|ssh|tel|telnet|tftp|xmpp):.*?)(?=$|[\s<>\x22\x27{}|\^\[\]`])/
   );

   return lines.map(function(line, index) {
         return (index % 2 ? wrapLink : afterURL)(line);
      }).join('');
};

module.exports = FidoHTML;
