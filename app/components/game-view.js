import Ember from 'ember';
import PIXI from 'pixi';
import PixiCanvas from 'ember-cli-pixijs/components/pixi-canvas';

export default PixiCanvas.extend({
    state: Ember.inject.service('game-state'),

    didInsertElement() {
         this.set("stage", new PIXI.Container());
         this.set("elements", {});
         this.$().attr('tabindex',0);
         this.$().focus();
     },

    keyDown(e) {
        var keys = this.get('state.keyBindings');
        if (keys.includes(e.key)) {
            this.get('state').send({user_id: "user001", event: {event: "keyDown", value: e.key}});
        }
    },

    keyUp(e) {
        var keys = this.get('state.keyBindings');
        if (keys.includes(e.key)) {
            this.get('state').send({user_id: "user001", event: {event: "keyUp", value: e.key}});
        }
    },

    draw() {
        // console.log("drawing"); 

        const renderer = this.get('pixiRenderer');
        const stage = this.get("stage");

        var sprites = this.get('state.sprites');
        var elements = this.get("elements");

        sprites.forEach(function(item){
            if (elements[item.id] === undefined) {
                var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("sprites/circle.png"))
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                
                sprite.position.x = item.location.x;
                sprite.position.y = item.location.y;
                stage.addChild(sprite);
                elements[item.id] = sprite;
            } else {
                sprite = elements[item.id];
                sprite.position.x = item.location.x;
                sprite.position.y = item.location.y;
            }
        });

        renderer.render(stage);
        
        Ember.run.later(this, this.draw, 15);

    }
});

