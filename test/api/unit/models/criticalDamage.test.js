import isVAT from 'validator/lib/isVAT';

function criticalCalculator(user, damage) {

    var damageResult;

    if(user.str<0 || user.int<0 || user.con<0 || user.per<0 ){
        return -1;
    }
     
    if(damage==0){
        return 0
    }
    
    if(user.class === 'warrior'){
        damageResult = user.str*6+damage*2;
        return damageResult;
        
    } 
    if(user.class === 'rogue'){
        damageResult = (user.str*3)+(user.per*4)+damage*2.5;
        return damageResult;
    }
    if(user.class === 'wizard'){
        damageResult = user.int*5+damage*2;
        return damageResult;
    }
    if(user.class === 'healer'){
        Number(damageResult);
        damageResult = user.int*2+user.con*2+damage*1.25;
        
        return damageResult;
    }
    
}

describe('CriticalDamage Model', () => {
    context('criticalCalculator', () => {
        it('calculate the damage after a critical attack from a warrior', () =>{
            const user = [
                {class: 'warrior', str: 0 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 200);
            expect(UserCriticalDamage).to.equal(400);

        })
        it('calculate the damage after a critical attack from a rogue', () =>{
            const user = [
                {class: 'rogue', str: 2, int: 0, con: 0, per: 3 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 10);
            expect(UserCriticalDamage).to.equal(43);
        })
        it('calculate the damage after a critical attack from a wizard', () =>{
            const user = [
                {class: 'wizard', str: 0, int: 8, con: 0, per: 0 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 74);
            expect(UserCriticalDamage).to.equal(188);
        })
        it('calculate the damage after a critical attack from a healer', () =>{
            const user = [
                {class: 'healer', str: 0, int: 2, con: 4, per: 0 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 4);
            expect(UserCriticalDamage).to.equal(17);
        })
        it('bug when some atribute is lower than zero', () =>{
            const user = [
                {class: 'rogue', str: -4, int: -1, con: -7, per: -2 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 10);
            expect(UserCriticalDamage).to.equal(-1);
        })
        it('dont have a critical damage when base damage is zero', () =>{
            const user = [
                {class: 'wizard', str: 0, int: 10, con: 0, per: 0 },
            ]

            const UserCriticalDamage = criticalCalculator(user[0], 0);
            expect(UserCriticalDamage).to.equal(0);
        })
    })

} )