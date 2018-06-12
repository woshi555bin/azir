let obj={section:[1,2,4],a:2}
let {section}=obj;
console.log(section);
section.splice(4,0,5);
console.log(section);
console.log(obj);

