import chai from 'chai';
import MersenneTwister from '../src/mersenneTwister.js';

import {
  arrayInitTestFn,
  choiceTestFn,
  exactSeqTestFn,
  floatGenTestFn,
  resetTestFn,
  seedChangeTestFn, shuffleTestFn, uniqueItemTestFn,
  withinRangeTestFn
} from './commonTests.js';

const expect = chai.expect;

const testData = [
  3499211612,  581869302, 3890346734, 3586334585,  545404204, 4161255391, 3922919429,  949333985, 2715962298, 1323567403,
  418932835, 2350294565, 1196140740,  809094426, 2348838239, 4264392720, 4112460519, 4279768804, 4144164697, 4156218106,
];

const testData2 = [
  2325592414, 482149846, 4177211283, 3872387439, 1663027210, 2005191859, 666881213, 3289399202, 2514534568, 3882134983,
  4129444750, 1642354536, 1534745662, 4071148575, 198677157, 743002443, 2133457855, 3498546871, 1282847148, 1855778934,
];

const initialStateData = [
  5489, 1301868182, 2938499221, 2950281878, 1875628136,  751856242,  944701696, 2243192071,  694061057,  219885934,
  2066767472, 3182869408,  485472502, 2336857883, 1071588843, 3418470598,  951210697, 3693558366, 2923482051, 1793174584,
  2982310801, 1586906132, 1951078751, 1808158765, 1733897588,  431328322, 4202539044,  530658942, 1714810322, 3025256284,
  3342585396, 1937033938, 2640572511, 1654299090, 3692403553, 4233871309, 3497650794,  862629010, 2943236032, 2426458545,
  1603307207, 1133453895, 3099196360, 2208657629, 2747653927,  931059398,  761573964, 3157853227,  785880413,  730313442,
  124945756, 2937117055, 3295982469, 1724353043, 3021675344, 3884886417, 4010150098, 4056961966,  699635835, 2681338818,
  1339167484,  720757518, 2800161476, 2376097373, 1532957371, 3902664099, 1238982754, 3725394514, 3449176889, 3570962471,
  4287636090, 4087307012, 3603343627,  202242161, 2995682783, 1620962684, 3704723357,  371613603, 2814834333, 2111005706,
  624778151, 2094172212, 4284947003, 1211977835,  991917094, 1570449747, 2962370480, 1259410321,  170182696,  146300961,
  2836829791,  619452428, 2723670296, 1881399711, 1161269684, 1675188680, 4132175277,  780088327, 3409462821, 1036518241,
  1834958505, 3048448173,  161811569,  618488316,   44795092, 3918322701, 1924681712, 3239478144,  383254043, 4042306580,
  2146983041, 3992780527, 3518029708, 3545545436, 3901231469, 1896136409, 2028528556, 2339662006,  501326714, 2060962201,
  2502746480,  561575027,  581893337, 3393774360, 1778912547, 3626131687, 2175155826,  319853231,  986875531,  819755096,
  2915734330, 2688355739, 3482074849,    2736559, 2296975761, 1029741190, 2876812646,  690154749,  579200347, 4027461746,
  1285330465, 2701024045, 4117700889,  759495121, 3332270341, 2313004527, 2277067795, 4131855432, 2722057515, 1264804546,
  3848622725, 2211267957, 4100593547,  959123777, 2130745407, 3194437393,  486673947, 1377371204,   17472727,  352317554,
  3955548058,  159652094, 1232063192, 3835177280,   49423123, 3083993636,     733092, 2120519771, 2573409834, 1112952433,
  3239502554,  761045320, 1087580692, 2540165110,  641058802, 1792435497, 2261799288, 1579184083,  627146892, 2165744623,
  2200142389, 2167590760, 2381418376, 1793358889, 3081659520, 1663384067, 2009658756, 2689600308,  739136266, 2304581039,
  3529067263,  591360555,  525209271, 3131882996,  294230224, 2076220115, 3113580446, 1245621585, 1386885462, 3203270426,
  123512128,   12350217,  354956375, 4282398238, 3356876605, 3888857667,  157639694, 2616064085, 1563068963, 2762125883,
  4045394511, 4180452559, 3294769488, 1684529556, 1002945951, 3181438866,   22506664,  691783457, 2685221343,  171579916,
  3878728600, 2475806724, 2030324028, 3331164912, 1708711359, 1970023127, 2859691344, 2588476477, 2748146879,  136111222,
  2967685492,  909517429, 2835297809, 3206906216, 3186870716,  341264097, 2542035121, 3353277068,  548223577, 3170936588,
  1678403446,  297435620, 2337555430,  466603495, 1132321815, 1208589219,  696392160,  894244439, 2562678859,  470224582,
  3306867480,  201364898, 2075966438, 1767227936, 2929737987, 3674877796, 2654196643, 3692734598, 3528895099, 2796780123,
  3048728353,  842329300,  191554730, 2922459673, 3489020079, 3979110629, 1022523848, 2202932467, 3583655201, 3565113719,
  587085778, 4176046313, 3013713762,  950944241,  396426791, 3784844662, 3477431613, 3594592395, 2782043838, 3392093507,
  3106564952, 2829419931, 1358665591, 2206918825, 3170783123,   31522386, 2988194168, 1782249537, 1105080928,  843500134,
  1225290080, 1521001832, 3605886097, 2802786495, 2728923319, 3996284304,  903417639, 1171249804, 1020374987, 2824535874,
  423621996, 1988534473, 2493544470, 1008604435, 1756003503, 1488867287, 1386808992,  732088248, 1780630732, 2482101014,
  976561178, 1543448953, 2602866064, 2021139923, 1952599828, 2360242564, 2117959962, 2753061860, 2388623612, 4138193781,
  2962920654, 2284970429,  766920861, 3457264692, 2879611383,  815055854, 2332929068, 1254853997, 3740375268, 3799380844,
  4091048725, 2006331129, 1982546212,  686850534, 1907447564, 2682801776, 2780821066,  998290361, 1342433871, 4195430425,
  607905174, 3902331779, 2454067926, 1708133115, 1170874362, 2008609376, 3260320415, 2211196135,  433538229, 2728786374,
  2189520818,  262554063, 1182318347, 3710237267, 1221022450,  715966018, 2417068910, 2591870721, 2870691989, 3418190842,
  4238214053, 1540704231, 1575580968, 2095917976, 4078310857, 2313532447, 2110690783, 4056346629, 4061784526, 1123218514,
  551538993,  597148360, 4120175196, 3581618160, 3181170517,  422862282, 3227524138, 1713114790,  662317149, 1230418732,
  928171837, 1324564878, 1928816105, 1786535431, 2878099422, 3290185549,  539474248, 1657512683,  552370646, 1671741683,
  3655312128, 1552739510, 2605208763, 1441755014,  181878989, 3124053868, 1447103986, 3183906156, 1728556020, 3502241336,
  3055466967, 1013272474,  818402132, 1715099063, 2900113506,  397254517, 4194863039, 1009068739,  232864647, 2540223708,
  2608288560, 2415367765,  478404847, 3455100648, 3182600021, 2115988978,  434269567, 4117179324, 3461774077,  887256537,
  3545801025,  286388911, 3451742129, 1981164769,  786667016, 3310123729, 3097811076, 2224235657, 2959658883, 3370969234,
  2514770915, 3345656436, 2677010851, 2206236470,  271648054, 2342188545, 4292848611, 3646533909, 3754009956, 3803931226,
  4160647125, 1477814055, 4043852216, 1876372354, 3133294443, 3871104810, 3177020907, 2074304428, 3479393793,  759562891,
  164128153, 1839069216, 2114162633, 3989947309, 3611054956, 1333547922,  835429831,  494987340,  171987910, 1252001001,
  370809172, 3508925425, 2535703112, 1276855041, 1922855120,  835673414, 3030664304,  613287117,  171219893, 3423096126,
  3376881639, 2287770315, 1658692645, 1262815245, 3957234326, 1168096164, 2968737525, 2655813712, 2132313144, 3976047964,
  326516571,  353088456, 3679188938, 3205649712, 2654036126, 1249024881,  880166166,  691800469, 2229503665, 1673458056,
  4032208375, 1851778863, 2563757330,  376742205, 1794655231,  340247333, 1505873033,  396524441,  879666767, 3335579166,
  3260764261, 3335999539,  506221798, 4214658741,  975887814, 2080536343, 3360539560,  571586418,  138896374, 4234352651,
  2737620262, 3928362291, 1516365296,   38056726, 3599462320, 3585007266, 3850961033,  471667319, 1536883193, 2310166751,
  1861637689, 2530999841, 4139843801, 2710569485,  827578615, 2012334720, 2907369459, 3029312804, 2820112398, 1965028045,
  35518606, 2478379033,  643747771, 1924139484, 4123405127, 3811735531, 3429660832, 3285177704, 1948416081, 1311525291,
  1183517742, 1739192232, 3979815115, 2567840007, 4116821529,  213304419, 4125718577, 1473064925, 2442436592, 1893310111,
  4195361916, 3747569474,  828465101, 2991227658,  750582866, 1205170309, 1409813056,  678418130, 1171531016, 3821236156,
  354504587, 4202874632, 3882511497, 1893248677, 1903078632,   26340130, 2069166240, 3657122492, 3725758099,  831344905,
  811453383, 3447711422, 2434543565, 4166886888, 3358210805, 4142984013, 2988152326, 3527824853,  982082992, 2809155763,
  190157081, 3340214818, 2365432395, 2548636180, 2894533366, 3474657421, 2372634704, 2845748389,   43024175, 2774226648,
  1987702864, 3186502468,  453610222, 4204736567, 1392892630, 2471323686, 2470534280, 3541393095, 4269885866, 3909911300,
  759132955, 1482612480,  667715263, 1795580598, 2337923983, 3390586366,  581426223, 1515718634,  476374295,  705213300,
  363062054, 2084697697, 2407503428, 2292957699, 2426213835, 2199989172, 1987356470, 4026755612, 2147252133,  270400031,
  1367820199, 2369854699, 2844269403,   79981964,
];

const nextStateData = [
  2601187879, 3919438689, 2270374771, 3254473187,  705526435,  752899028, 4259895275, 1635503293,  287311810, 3348146311,
  587101971, 1133963260,  197444494, 1569747226, 2853653046, 3654449492, 3823320007, 1939491435,  191871982, 2550916200,
  2586577334, 1836795533, 2550787344, 3774101499,  499856526, 4035163043,  969324510,  502882529, 3747915135, 3677962142,
  4247339488,  668043123, 3114378363,  585508492,  542098765, 4155704470, 3660917119,  126230230, 1522675206,  153049183,
  1637257449, 3281868928,  979462891, 1058287769,   61525060, 3887730846, 3905100104, 1956723994, 4085220955, 3202629445,
  4112745420,  877772572, 3341645661,  331737137, 2270305335,  159419296, 2503600762,  451751822, 1083485811, 1445113017,
  150608331,  422828708, 2507709208, 3804045526, 2086909439, 4090458745, 1662894632, 2371871123, 3266028938, 3412874573,
  1564584271, 4167008239,  319160793, 1225298391, 4161956981, 3585990452, 2573113091, 1630884103,  997591457,  996494329,
  2686829642, 3651385850,  300660150,  251233608, 2731448254, 3271745554, 1133669415, 2602763402, 3609598910, 3119890150,
  2068448659, 2512941629, 2192028056, 3536672045, 1605585867,  987929371, 3628305377, 3597455410, 3551228490, 4133937922,
  2490571536, 3920924840, 3569243872, 3272512015, 1796837098, 1735422750, 3686651765, 3897135636, 1148857629,  783899959,
  2380757210, 1621036080, 2512995685, 1314946383,  195879552, 1712690214,  134121293, 2558246413, 1909295793, 4011814961,
  3584678033, 3552917322, 2895522131, 2197479543,  599948941, 3054641120, 1896938373, 3039964013, 1872754348, 3148850798,
  2107216694, 1457074081, 2885919429, 2673983641, 3439943002,  870488328, 3207188349, 2106353973, 3677712338,  858424175,
  1253591073, 2543671298, 2173076892, 4241262707, 3125777792,  937639453, 3794644771, 1031184467, 1762096386, 1582522796,
  2401451448, 1923687658, 3041175264, 1553520828, 1499754517, 3874023455, 2605056296, 3039888102, 1303021756, 1642751373,
  1823333037, 1633927268, 3515841308, 3444633309, 3781936666, 2809133915, 3605157463, 2111775741, 4189224133, 1541376461,
  2404717080, 4269480857,  977189618, 1665607742, 1629250805, 2457077617,  239411934, 3667589811, 1869810277, 1786963907,
  2464100961, 2087821940, 1259003512,  276996953,  797806588, 3071924361, 2277580686, 4202707827, 1388129925, 2102369776,
  1628022127, 2487208107, 3087861794, 1052589112,  419878642,  130232609,  109631040, 2052113021, 2352638891, 3505327656,
  1245960092, 1830675294, 3601635339, 3493669978, 2998128382, 1669215416, 4294454851, 2093225537, 1094833212, 3273688535,
  3217483090, 2119564735, 1480278974, 2437451062, 1653704104, 3486785552,   87986508,  429079035, 3325830834, 1173159674,
  3117122078,   58610491,  861618023, 3127089575,  788511071, 3165761011, 3504889677, 1407514791, 2912129370, 2669842377,
  65597446, 2809811316, 1936888672, 2735813429, 2992168722, 2213185349, 2759840193, 3953154784, 1561769082, 2042753077,
  1431122408, 2948426693,  222113656, 1532323091, 3465951077,  531543838,  463855516,  259721548,  595116526, 3129247900,
  2801040682,  538274173, 3291042483, 3080595328, 1887205203,  158727281, 3040111581,  218801154, 3984624257, 2054350644,
  2080133350,  637187864, 2040737093,  616990199, 3893926523,   79368930, 2444288761, 2454929062,  816464100, 1797157122,
  2590520370, 1517945845,  585466041, 2048644740, 1148006305,  232096794, 1288445919, 2815085715, 3360592226, 2612544241,
  3735001635, 1982293843, 2437762859, 1380875628, 1511870631, 1503310543, 3124191302,  672465147,    1097623, 2986124200,
  3488182882, 3458056040,  960516857, 2873195180, 4198947675,   21992134, 3918247947, 3659648629, 3966894158, 1603926895,
  3947065708, 4064432254,  314205538,  872618379, 3563243059,  304253681,  783558693, 2503271980, 3495646321, 1290872763,
  3121520939, 2942098806,  641090084, 2040744877, 2641640520, 2822298419, 2885259028, 1013302765, 2006133592, 3672833023,
  266147116, 2422267738,  501894401,  345672645, 2384900549, 3593315420,  168531307, 3138115426, 2559469854,  878370741,
  567096748, 1342975608, 1929917421, 3815079155, 3887969580,  379967032, 3933320244, 1022246178, 3298764003, 3352606638,
  3810828369, 1116729323, 2381652356,  622561456, 2745681725, 3387916065,  938595997,    4901396, 3264727977, 3990265482,
  1545695311, 2583073239,   25719318,  359879420, 2690926668, 1737962267, 1872326961, 2971436963,  856135260, 1262752712,
  1803801525, 3825067982,  227806404,  531264838, 2692088805, 1020958178, 2462141362,  867482822, 4142146091,  149020123,
  3976685847, 2156258478, 1566485989,  636188758, 1911328438, 1228372759,  761095935,   93755721, 1443003772,  937784737,
  2078374011, 4179063358, 1256093635, 2390763207, 1312271775,  498684952, 3381068839, 2094766662, 3384348866, 4250970780,
  2736167046, 1975999640, 3449310360, 1249986286, 1623556171, 2459105852, 1161613179, 4241934306, 3592740997, 4164507334,
  1031114739, 2038402399,  945921397,  405487343,  138708438, 3414161765, 2912469629,  220667773, 2009463834,  112293856,
  3463567532, 4173647700, 2447477757, 1074847995, 2240777610, 3343165669, 1207699502, 2670340302, 1464222360,  145352797,
  4013782448, 2798704117, 3854604174,  301538628, 3254669258, 3496478697,  195964083, 2340356226,  158045975,   89523493,
  3012065632, 1685882608,  582880035, 3084954840, 3758218654, 2812719378,  914681218, 3492165600,  252202130, 3133981835,
  1682632314, 1511367028, 3091183057, 2169963046, 1791825518,   26880152,  943542572,  124950977, 3436569249, 2931277172,
  2360174007, 2297876068,  324140282, 3145103099,  878367086,  746517350, 2447571951,  113826277,  455271391, 2021629898,
  311130642, 4190715446, 2096076314, 2637293993, 4081579075, 1195677250, 2995667596, 3378498797, 2310622554, 4036366420,
  2255722665,  653284776, 2734982087,  776639191, 1840567454, 2718554699, 4121086132, 3648536374,  376160211,  345701825,
  3172728420, 1574538422, 1459410665, 4197243794, 4047198565, 4156270602, 4158935841, 3766821729, 1411764188, 3632321377,
  3403794111, 3833557234, 3599364771, 1036284889,   24670187, 2235700863, 4190632977,  425187274, 2031251706, 3670054996,
  2155400770,  192611794, 2839969695,  299462972,   12797895, 3966267574, 3400571208, 3669765080, 3508427657, 3235589560,
  3193293610,  925737567, 1488513860, 2440222622, 1120038826, 3957100300, 1727699532, 2066529857, 1405887448, 3610495290,
  958674275,  405728232, 3364823839,  673899695, 3789105973, 1675609960,   98445821, 3209212267,  298129863,  330602789,
  2765562200,  507842865,  729452063, 2371849561, 2107993350, 3060623393,  756469007, 1494691292,  289556860,   91472947,
  1249357945,  854006002, 2109176687, 1212277959, 3811972867, 3564054431,  671407310,  118971092, 1896128714,  551706431,
  2067080292, 1335799548, 3473466841, 1549134658,   32104447, 2995416126,  544027868,   52897576, 1642961318, 2693801207,
  3726909303,  218117047, 4156633525, 3536249408, 1009174707, 4181022899, 3945338608,  354768839, 2202138544,  215184568,
  61111279, 1914789892, 3049369045, 3404495672, 3795455853, 2610561194,  503121087,   23446167,  323357009, 3710519877,
  922256365, 2131896758,  744734225,  970651722, 1335476026, 1974620788, 2256794949, 3015924989, 4048571554, 1990784236,
  22896868, 3992110738, 2560474406, 4215514841,  974260437, 3208940655, 4167287399, 2454179266, 4093879596, 2462688439,
  163846102, 4211244342, 2092190284, 2985895911, 1620740022, 2656641972,  449410644, 3973823023, 3960679300, 1074759248,
  698903848, 1233675965, 3236169158,  415317533, 1028329372, 2994946905, 3311476626, 1172312971, 3837858120, 2085838740,
  3576264772, 2903063865, 3505442042, 3518038711,
];

const seed = 5489;
const seed2 = 19650218;

const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

const generator = (genSeed) => new MersenneTwister(genSeed);

describe('Mersenne Twister Generator 32 bit.', () => {
  describe('Generator should be seeded with correct values.', () => {
    const random = generator(seed);

    it(`Expect initial seed to be set correctly.`, () => {
      expect(random.seed).to.be.oneOf([seed, BigInt(seed)]);
    });

    it(`Expect new seed to be set correctly.`, () => {
      random.seed = seed2;
      expect(random.seed).to.be.oneOf([seed2, BigInt(seed2)]);
    });
  });

  describe('Generator state once initialised should match test data.', () => {
    it('Expect generator internal state to match reference copy.', () => {
      const random = generator(seed);
      initialStateData.forEach((item, i) => {
        expect(random.state[i]).to.equal(BigInt(item));
      });
    });
  });

  describe('Generator state should compute nextState() correctly.', () => {
    it('Expect generator internal state to mutate and match reference copy.', () => {
      const random = generator(seed);

      random.nextState();

      nextStateData.forEach((item, i) => {
        expect(random.state[i]).to.equal(BigInt(item));
      });
    });
  });

  // Tests for the production of an exact sequence of numbers from the seed.
  exactSeqTestFn(generator(seed), testData, seed);
  exactSeqTestFn(generator(seed2), testData2, seed2);

  // Tests for successful reset of the generator.
  resetTestFn(generator(seed), testData);

  // Test that the generator stays within the given bounds.
  withinRangeTestFn(generator(seed), lowerBound, upperBound, numDraws);

  // Test that generator actually produces floats.
  floatGenTestFn(generator(seed), numDraws);

  // Test that generator generates two different, exact sequences after being reseeded.
  seedChangeTestFn(generator(seed), seed2, testData, testData2);

  // Choice
  choiceTestFn(generator(seed), testData);
  choiceTestFn(generator(seed), testData2);

  // Array initialisation.
  arrayInitTestFn(generator(seed), numDraws, lowerBound, upperBound);
  uniqueItemTestFn(generator(seed));

  // Array shuffling.
  shuffleTestFn(generator(seed));
});

