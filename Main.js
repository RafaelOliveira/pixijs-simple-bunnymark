var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x1099bb});
renderer.view.style['transform'] = 'translatez(0)';
renderer.view.addEventListener('click', function() { addBunnies(1000); });
document.body.insertBefore(renderer.view, document.body.firstChild);

var bunnies = [];
var gravity = 0.5;
var minX = 0;
var maxX = renderer.width - 26;
var minY = 0;
var maxY = renderer.height - 37;
var bunniesCount = 0;

var totalText = document.getElementById('total');

// create the root of the scene graph

// simpler
// var stage = new PIXI.Container();

// faster
// http://pixijs.github.io/docs/PIXI.ParticleContainer.html
var stage = new PIXI.ParticleContainer(200000);

var texture = PIXI.Texture.fromImage('wabbit_alpha.png');

// fps
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

updateTotalText();
animate();

function animate() 
{
	stats.begin();    
    update();
    renderer.render(stage);
    stats.end();

    requestAnimationFrame(animate);
}

function update()
{
	for (i = 0; i < bunnies.length; i++)
	{
		bunnies[i].spt.position.x += bunnies[i].speedX;
		bunnies[i].spt.position.y += bunnies[i].speedY;
		bunnies[i].speedY += gravity;			
		
		if (bunnies[i].spt.position.x > maxX)
		{
			bunnies[i].speedX *= -1;
			bunnies[i].spt.position.x = maxX;
		}
		else if (bunnies[i].spt.position.x < minX)
		{
			bunnies[i].speedX *= -1;
			bunnies[i].spt.position.x = minX;
		}
		if (bunnies[i].spt.position.y > maxY)
		{
			bunnies[i].speedY *= -0.8;
			bunnies[i].spt.position.y = maxY;
			if (Math.random() > 0.5) bunnies[i].speedY -= 3 + Math.random() * 4;
		} 
		else if (bunnies[i].spt.position.y < minY)
		{
			bunnies[i].speedY = 0;
			bunnies[i].spt.position.y = minY;
		}	
	}
}

function addBunnies(count) 
{
	for(i = 0; i < count; i++)
	{		
		var bunny = {
			spt: new PIXI.Sprite(texture),
			speedX: Math.random() * 5,
			speedY: (Math.random() * 5) - 2.5
		};
		
		bunnies.push(bunny);
		stage.addChild(bunny.spt);		
	}

	bunniesCount += count;
	updateTotalText();
}

function updateTotalText()
{
	totalText.innerHTML = 'Total: ' + bunniesCount;
}